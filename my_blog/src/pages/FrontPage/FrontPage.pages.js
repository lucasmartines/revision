import React,{useState,useEffect} from 'react';

import { useLocation } from 'react-router-dom'
import './FrontPage.style.scss';
import PostListComponents from '../../components/PostList.components';
import getPost from '../../services/post/getPost.service'

function FrontPage( props ) 
{
  let [posts, setPost] = useState([])
  let location = useLocation()

  useEffect( () => {

    getPost().then( ( postsCarregados ) => {
        let _posts = []
        postsCarregados.forEach( doc => {
          _posts.push( { id: doc.id , ...doc.data() }  )
        })

       setPost(_posts)
    })
    
  } , [ location ] )




  return (
    <div className="container">
      <div className="front-page ">
        <PostListComponents posts={posts} />
      </div>
    </div>
  );
}

export default FrontPage;
