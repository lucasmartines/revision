import React,{useState, useEffect} from 'react'
import {useParams,useLocation,useHistory} from 'react-router-dom'

import { useMetadata } from '../../context/Metadata.context'
import savePost from '../../services/post/savePost.service'
import updatePost from '../../services/post/updatePost.service'


import firebase from '../../firebase.config'

export default ({}) => {


    let [novoPost,setNovoPost]  = useState({
        titulo:"",
        conteudo:""
    })
    let [ version,useVersion ] = useMetadata()
    let [salvandoStatus,setSalvandoStatus ] = useState({
        mensagem:"",
        estouSalvando: false
    })
    let location = useLocation();
    let params = useParams()
    let history = useHistory() 


    useEffect( () => {

        const componentStart = async () => 
        {
            if( params?.id ){
                // modo atualizar
                let post =  await firebase.firestore().doc("posts/"+params.id).get()
                post = post.data()

                
                setNovoPost({
                    titulo:post.titulo,
                    id: post.id,
                    conteudo: post.conteudo,
                    link: post.link
                })
            }
        }
        
        componentStart()

    } , [location] )



    const changeValue = ( e ) => 
    {
        let {name,value} = e.target 
        setNovoPost({ ...novoPost,[name]:value}  )
    }

    const handleDelete = () => {


        if(  window.confirm("Quer Deletar") ){
            firebase.firestore().doc("/posts/"+params.id ).delete()
            history.push("/")
        }

    }

    const handleFileChange = (e) => {
        
        
        let file = e.target.files[0]
        if( file ){
            let reader = new FileReader()
            reader.onload = () => {
                setNovoPost({...novoPost,link:reader.result})
            }
            reader.readAsDataURL( file )
            
        }
    }

    const onUpdate = () => {
       
        setSalvandoStatus({estouSalvando:false,mensagem:""})
        alert("updated")        
        
    }

    const onSave = ({id}) => {
         
        setSalvandoStatus({estouSalvando:false,mensagem:""})
        history.push(`/admin/editar_post/${id}`)
        alert("Item salvo com sucesso")
    }

    const handleSubmit = (e) =>{
        e.preventDefault()


            if( params?.id ){
                
                setSalvandoStatus({estouSalvando:true ,mensagem:"Estou Atualizando..."})
               // console.log(  e.target.file.files[0] )
                  updatePost({...novoPost } , e.target.file.files[0] , params.id , onUpdate )
                
            }else{
                setSalvandoStatus({estouSalvando:true ,mensagem:"Estou Salvando..."})
                savePost({...novoPost } , e.target.file.files[0] , onSave )
            }

            setSalvandoStatus({estouSalvando:false,mensagem:""})
        
    }

    return(
            <div className="container">
                <h2 className="titulo"> Admin Blog {version} </h2>
                <div className="admin-page">
                    <div>
                        <div>
                            <img src={novoPost.link} /> <br/>
                            <small> Imagem Antiga </small>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="titulo">Nome</label>
                            <input 
                                name="titulo"
                                value={novoPost.titulo} 
                                onChange={changeValue} required/>

                            <label htmlFor="file" >File</label>
                            <input 
                                name="file"
                                type="file" 
                                onChange={handleFileChange}  
                                /* if link exists then user is not obrigated to fill it */
                                required={novoPost.link ? false : true }
                            />

                            <label htmlFor="conteudo">Conteudo</label>
                            <textarea 
                                required 
                                rows={10} 
                                cols={60}
                                name="conteudo" 
                                value={novoPost.conteudo}
                                onChange={changeValue} />
                            <div className="d-flex">
                                <button 
                                    disabled={salvandoStatus.estouSalvando}
                                    onClick={() => handleSubmit}
                                > Inserir/Atualizar Post</button> 

                                <button 
                                    onClick={  handleDelete }> 
                                    Deletar Post 
                                </button>
                            </div>
                            {salvandoStatus.estouSalvando?"estou salvando":""}
                        </form>

                        
                    </div>
                    <div>
                        <ul>
                            <li> Blog 1 </li>
                            <li> Blog 2 </li>
                            <li> Blog 3 </li>
                        </ul>
                    </div>
                </div>
            </div>
    )
}