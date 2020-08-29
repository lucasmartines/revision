export default class Usuario
{

	nome:String
	idade: number

	public constructor(nome:String) {
		this.nome = nome 

	}
	public printarNome(){
		console.log( this.nome )
	}

}