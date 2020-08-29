export default class Guerreiro
{
	private _nome:String 
	private _vida:Number

	get nome() : String {
		return this._nome;
	}
	set nome( nome : String) {
		this._nome = nome
	}	
}