import firebase from '../firebase.js'

/**
 * 
 * @param {string} entradaString 
 * cria um array no seguinte padrão:
 * exemplo: "lucas"
 * [ l , lu , luc , luca , lucas ]
 * "maria":
 * [ m , ma , mar , mari , maria ]
 */
let converterLetrasEmArray = ( entradaString ) => {
   
    let anterior = ""
    let todasLetras = []
    
    entradaString.split("").forEach( letraAtual => {
        todasLetras.push( anterior + letraAtual )
        anterior += letraAtual      
     })
 
    return todasLetras
}

const separarStringEmArrayPorEspaco = ( entradaString ) => {

    return entradaString
            .split(/(\s+)/)
            .filter( function(e) 
            { 
                return e.trim().length > 0; 
            } );
}

export default async ( nomeCarteira ) => {


    let palavrasChave = separarStringEmArrayPorEspaco( nomeCarteira )

    let keywords = [""," "];

    for( let i = 0 ; i < palavrasChave.length ; i++ ){
        keywords.push( palavrasChave[i] )
        keywords.push(
            ...converterLetrasEmArray( palavrasChave[i]?.toLowerCase() )   )  
    }


    
    let limit = palavrasChave.length 

    for( let n = 0; n < limit ; n++){ 
        let testeX = ""
        for( let d = 0; d < limit ; d++){
        //    console.log( palavrasChave[ ( n + d ) % 3 ] )
            testeX+= palavrasChave[ ( n + d ) % limit ] + " "
        }
        keywords.push( ...converterLetrasEmArray(testeX )   )
    }

    keywords.push(...converterLetrasEmArray(nomeCarteira))


    // eliminar duplicados
    keywords = new Set(keywords)

    console.log(":set",keywords)
    if( nomeCarteira != ""  && typeof nomeCarteira == "string" ){
        return await firebase.firestore().collection("carteira").add({
            title: nomeCarteira,
            keywords:[...keywords]
        })
    } 
    
}
