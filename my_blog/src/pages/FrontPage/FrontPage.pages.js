import React,{useState,useEffect} from 'react';

import { useLocation } from 'react-router-dom'
import './FrontPage.style.scss';
import PostListComponents from '../../components/PostList.components';
import getPost from '../../services/post/getPost.service'


import firebase from '../../firebase.config'



function FrontPage( props ) 
{



  let [posts, setPost] = useState([])

  /* the last post is used to be the first of next page */
  let [lastPostDoc,setLastPostDoc] = useState(null)

  /** the actual whill be used to be the last of prevews page */
  let [actalPostDoc,setActualPostDoc] = useState(null)


  let location = useLocation()
  let defaultQuery = firebase.firestore().collection("posts").orderBy("titulo")

  const getAllPosts = ( postsCarregados ) => 
  {
    
        var last = postsCarregados.docs[ postsCarregados.docs.length - 1 ]
        var actual = postsCarregados.docs[0]


        console.log( postsCarregados.docs.length -1 )


        if( actual  ){
          setActualPostDoc(actual )
        } 
        if( last ) { 
          setLastPostDoc(last)
        }



        console.log("last",last)
        console.log("actual",actual)
        
        if( last && actual ){

            let _posts = []
            postsCarregados.forEach( doc => {
              _posts.push( { id: doc.id , ...doc.data() }  )
            })
    
          setPost(_posts)
          console.log(_posts)
        }
       
  }


  useEffect( () =>
  {
    // this will force a freash first page
    // to avoid bug for examle: when user delete something 
    // this will get from my page, to avoid this
    // i reset and let hin to first page
      setActualPostDoc(null)
      setLastPostDoc(null )


      console.log("reset")
      defaultQuery
        .limit(3)
        .get()
        .then(  getAllPosts  )
      
  } , [ location ] )

  const onBeforeHandle  = () => {

      if( actalPostDoc != null && actalPostDoc != undefined)
      {
        defaultQuery
            .endBefore(actalPostDoc)
            .limitToLast(3)
            .get()
            .then(  getAllPosts  )
      
      }else
      {
        defaultQuery
          .limit(3)
          .get()
          .then(  getAllPosts  )

      }

  }

  const onNextHandle  = () => {

    if( lastPostDoc != null && lastPostDoc != undefined)
    {
      defaultQuery
          .startAfter(lastPostDoc)
          .limit(3)
          .get()
          .then(  getAllPosts  )
    }else
    {
        defaultQuery
          .limit(3)
          .get()
          .then(  getAllPosts  )
    }

  }


  return (
    <div className="container">
      <div className="front-page ">
        {(posts.length?
            (<PostListComponents posts={posts} />):(
              <h2 className="titulo">Carregando... </h2>
            )
        )}
        
        
        <div class="front-page__controller">
            <button onClick={onBeforeHandle}>Previews</button>
            <button onClick={onNextHandle}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
