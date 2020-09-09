import { gerarKeywors } from './savePost.service'
import firebase from '../../firebase.config'


const savePost = (post, link, keywords, docId = "") =>
{

  if (post.titulo.length && post.conteudo.length) {
    firebase
      .firestore()
      .collection("posts")
      .add({
        titulo: novoPost.titulo,
        conteudo: novoPost.conteudo,
        link,
        keywords: gerarKeywors(novoPost.titulo),
      })
      .then(() => {
        alert("Enviado com successo");
      })
      .catch(() => {
        alert("Deu RUIM");
      });
  }
};

const updatePost = ( post , link , keywords , docId ) => 
{
  
  if (post.titulo.length && post.conteudo.length)
  {
        
    firebase
      .firestore()
        .collection("posts")
        .doc(docId)
        .set({
            titulo: post.titulo,
            conteudo: post.conteudo,
            link,
            keywords
        },{
          merge:true
        })
        .then(() => {
            alert("Enviado com successo");
        })

    }
  else{
    console.alert("Operação invalida post.titulo ou post.conteudo não podem ser vasios")
  }
}

export default ( post , file , id , isUpdate = false ) =>
{

  

   if(file == null){
       updatePost(post, null ,gerarKeywors ( post.titulo ),id )
   } else{

    
      if ( file.name ) {
          var uploadTask = firebase
            .storage()
            .ref(file.name)
            .put(file);
    
          uploadTask.on("state_changed", null, null, async () => 
          {
              let link = await uploadTask.snapshot.ref.getDownloadURL();
              updatePost(post,link,gerarKeywors ( post.titulo ),id )
          });
        }  
   }
  
}


