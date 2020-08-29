import Usuario from './Usuario'


export default class Livro{

	private _nome: String 
	public usuario: Usuario 

	public constructor(  _nome: String ){

		this._nome = _nome 
	}

	public alertLivro():void{
		alert( "O nome do livro: " + this._nome )
	}

	public alertUsuario():void{

		alert( this.usuario.nome )

	}

}