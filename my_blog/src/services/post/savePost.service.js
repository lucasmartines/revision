import firebase from '../../firebase.config'


export let converterLetrasEmArray = ( entradaString ) => {
   
    let anterior = ""
    let todasLetras = []
    
    entradaString.split("").forEach( letraAtual => {
        todasLetras.push( anterior + letraAtual )
        anterior += letraAtual      
     })
 
    return todasLetras
}

export const separarStringEmArrayPorEspaco = ( entradaString ) => {

    return entradaString
            .split(/(\s+)/)
            .filter( function(e) 
            { 
                return e.trim().length > 0; 
            } );
}
/**
 * 
 * @param {*} nome 
 * @returns {Array} lista de keywords
 */
export const gerarKeywors =  (  nome  ) => {

    if( nome == null){
        throw new Error("Erro ao passar parametro nulo")
    }
    /* exemplo lucas martines => [lucas,martines] */
    let palavrasChave = separarStringEmArrayPorEspaco(  nome  )

    let keywords = [""," "];

    /* gerar uma palavra exemplo
    lucas => l,lu,luc,luca,lucas */
    for( let i = 0 ; i < palavrasChave.length ; i++ ){
        keywords.push( palavrasChave[i] )
        keywords.push(
            ...converterLetrasEmArray( palavrasChave[i]?.toLowerCase() )   )  
    }


    /* fazer loop dentro de: [lucas martines alcantarilla] , [martines , alcantarilla , lucas ]
    [alcantarilla,lucas,martines] , [lucas,martines,alcantarilla] */
    let limit = palavrasChave.length 

    for( let n = 0; n < limit ; n++){ 
        let testeX = ""
        for( let d = 0; d < limit ; d++){
        //    console.log( palavrasChave[ ( n + d ) % 3 ] )
            testeX+= palavrasChave[ ( n + d ) % limit ] + " " // criar um espaço entre as palavras
        }
        // vai gerar lucas martines -> l , lu , luc, luca,lucas,lucas m,luacas mar...
        keywords.push( ...converterLetrasEmArray(testeX )   )
    }

    /* colocar a busca inteira  */
    keywords.push(...converterLetrasEmArray( nome ))


    // eliminar duplicados
    keywords = new Set(keywords)

    return [...keywords]
    
}


export default ( novoPost , file , onSave ) => 
{
   if(file == null){
       throw new Error("Arquivo não pode ser nulo")
   }
  if (novoPost.titulo.length && novoPost.conteudo.length)
  {

 
    if ( file.name ) {
      var uploadTask = firebase
        .storage()
        .ref(file.name)
        .put(file);

      uploadTask.on("state_changed", null, null, async () => 
      {
        let link = await uploadTask.snapshot.ref.getDownloadURL();
        console.log(link);
        firebase
          .firestore()
          .collection("posts")
          .add({
            titulo: novoPost.titulo,
            conteudo: novoPost.conteudo,
            link,
            keywords: gerarKeywors ( novoPost.titulo ) 
          })
          .then(( data ) => {
            if( onSave && typeof onSave == "function")
            {
             
               onSave( { id:data.id } )
            }
          })

      });

    }
  }// ./if
};
