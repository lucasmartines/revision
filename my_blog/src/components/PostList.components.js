import React from 'react'
import {Link} from 'react-router-dom'


export default ({posts}) => {

    console.log("arr:",posts )

    const linkOuDefault = ( url) => {
        return url ? url : "https://via.placeholder.com/150"
    }

    let showPostList = () => 
    {
        return posts && posts?.map (
             ({titulo,conteudo,link,id}) => (
                <li key={id}>
                    <img className="float-left" src={linkOuDefault(link)}  />
                    <h2 className="titulo">{titulo}</h2>
                    <p> {conteudo.slice(0,100)}...</p>
                    <div>
                        <Link to={`/post/${id}`} >Visualizar Post  - </Link>
                        <Link to={`/admin/editar_post/${id}`} > Editar </Link>
                    </div>
                </li>
            )
        ) 
    }

    return(
        <div>
            <h2 className="titulo"> Ultimos Posts </h2>
            <ul className="posts-list flex-column">
                {showPostList()}
            </ul>
        </div>
    )
}