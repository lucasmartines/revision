import { gerarKeywors } from './savePost.service'
import firebase from '../../firebase.config'


const updatePost = ( post , link , keywords , docId = "" , updated ) => 
{
  if (post.titulo.length && post.conteudo.length)
  {
        
    let data = {
        titulo: post.titulo,
        conteudo: post.conteudo,  
        keywords
    }
    if( link ) {
      data['link'] = link
    }

    firebase
      .firestore()
      .collection("posts")
      .doc(docId)
      .set( data ,{
        merge:true
      })
      .then(() => 
      {
          if( typeof updated == "function"){
              updated()
          }
      })
    }
  else{
    console.alert("Operação invalida post.titulo ou post.conteudo não podem ser vasios")
  }
}

export default ( post , file , id , updated   ) =>
{

  

   if( !file ){
      console.log('NOT _ FILE')
       updatePost(post, null ,gerarKeywors ( post.titulo ),id , updated )
   } else{

    
      if ( file.name ) {
          var uploadTask = firebase
            .storage()
            .ref(file.name)
            .put(file);
    
          uploadTask.on("state_changed", null, null, async () => 
          {
              let link = await uploadTask.snapshot.ref.getDownloadURL();

              updatePost(post,link,gerarKeywors ( post.titulo ),id , updated )
          });
        }  
   }
  
}


