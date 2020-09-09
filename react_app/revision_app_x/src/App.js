import React from 'react';
import Header from  './components/Header.js'
import ShowState from './components/ShowState.js'
import { ToastContainer, toast } from 'react-toastify';


import './style/index.scss'
import 'react-toastify/dist/ReactToastify.css';



import getAllCarteirasService from './services/getAllCarteiras.service'
import saveOneCarteiraService from './services/saveOneCarteira.service'


import AppContainer from './containers/AppContainer.container'




class App extends React.Component{
	
	state = {
		busca: [],
		buscaString: "",
		estouBuscando: false
	}
	constructor( props ){
		super(props)
		this.getAllCarteiras = this.getAllCarteiras.bind( this )
		this.insertCarteira = this.insertCarteira.bind( this )
	}

	async getAllCarteiras()
	{
		let busca = await getAllCarteirasService( this.state.buscaString.trim() ) 
		this.setState( {estouBuscando:true} )
		this.setState( { busca } )
		this.setState( {estouBuscando:false})
	}
	componentDidMount(){ }

	mudarInput(e)
	{

		this.setState({
			[e.target.name]:e.target.value 
		})
	}

	checkIfIsEnter(e , callback)
	{
		if( e.keyCode == 13) callback()
	}

	async insertCarteira()
	{
		await saveOneCarteiraService(this.state.buscaString )
		toast.success(`Foi inserido(a): ${this.state.buscaString}`)
		this.setState({buscaString:""})
	}
	mostrarItems()
	{
		const buscandoMsg = ( <ul style={{color:"white"}}>
			Buscando...
		</ul> )

		const listagemItems = ( 
			<ul>
				{this.state.busca?.map( c  => (
					<li key={c.title}> <ShowState nome={c.title} /> </li>
				) )}
			</ul>
		)
		return this.state.estouBuscando ? (buscandoMsg) : listagemItems ;
	}
	render()
	{

		return(
			<>
				<AppContainer titulo="Busca">
					<div className="comentario-container">		
						{this.mostrarItems()}
					</div>
					<div class="input-container">
						<input 
							value={this.state.buscaString}  
							type="search" 
							name="buscaString" 
							onChange={(e) => this.mudarInput(e)} 
							placeholder="Escreva Algo"
							onKeyUp={ ( e ) => this.checkIfIsEnter(e , this.getAllCarteiras ) } />
						<br/>
						<input 
							type="button" 
							value="Buscar"
							onClick={(e) => this.getAllCarteiras() } />
						<input 
							type="button"
							value="InserirNovo"
							onClick={ e => this.insertCarteira() }
							className="pink_bg"
						/>
					</div>					
				</AppContainer>
				<ToastContainer />

			</>
		)
	}
}
export default App;
