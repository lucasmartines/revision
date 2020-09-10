import './MostrarUmPost.style.scss'

import React,{useState, useEffect} from 'react'
import {useParams,useLocation,useHistory} from 'react-router-dom'

import { useMetadata } from './../../context/Metadata.context'
import {Link } from 'react-router-dom'
import {history} from 'react-router-dom'
import firebase from '../../firebase.config'

export default () => {



    let [ post , setPost ] = useState({})

    let [ version,useVersion ] = useMetadata()
    let location = useLocation();
    let params = useParams()
    let history = useHistory()
    window.myHistory = history
    useEffect( () => {
       
        const componentStart = async () => {
            
            
            if( params?.id && params?.id !="undefined"){
                // modo atualizar
                let _post =  await firebase.firestore().doc("posts/"+params.id).get()
                let _id = _post.id

                _post = _post.data()

                if( _post )
                {

                    setPost({
                        titulo:_post.titulo,
                        id: _id ,
                        conteudo: _post.conteudo,
                        link: _post.link
                    })
                }
                else{
                    
                    history.push("/not-found")
                }
                
            }else{
                
                history.push("/")
            }
        }
        
        componentStart()

    } , [location] )



    return(
        <>
            <div className="mostrarPostPage container">
                <h2 className="titulo">{post?.titulo}   </h2>
                <div className="mostrarPostPage__postImage">
                    <img src={post?.link}/>
                </div>
                <div>
                    {post?.conteudo} 
                </div>    
                <div>
                    <Link to={`/admin/editar_post/${post?.id}`} > Editar </Link>
                </div>   
            </div>
        </>
    )
}