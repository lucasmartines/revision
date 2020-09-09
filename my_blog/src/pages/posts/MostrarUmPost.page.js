import './MostrarUmPost.style.scss'

import React,{useState, useEffect} from 'react'
import {useParams,useLocation} from 'react-router-dom'

import { useMetadata } from './../../context/Metadata.context'
import {Link } from 'react-router-dom'

import firebase from '../../firebase.config'

export default () => {



    let [ post , setPost ] = useState({})

    let [ version,useVersion ] = useMetadata()
    let location = useLocation();
    let params = useParams()

    useEffect( () => {
       
        const componentStart = async () => {
            if( params?.id ){
                // modo atualizar
                let _post =  await firebase.firestore().doc("posts/"+params.id).get()
                let _id = _post.id


                _post = _post.data()
                 
                setPost({
                    titulo:_post.titulo,
                    id: _id ,
                    conteudo: _post.conteudo,
                    link: _post.link
                })
            }
        }
        
        componentStart()

    } , [location] )



    return(
        <>
            <div class="mostrarPostPage container">
                <h2 >{post?.titulo}   </h2>
                <div>
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