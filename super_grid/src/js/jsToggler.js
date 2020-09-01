
import * as $ from 'jquery'


/**
	Serve para ligar ou desligar o popup de portfólio
*/
let togglePopup = () => 
	document.querySelector('.popup').classList.toggle('popup--active')
	

/**
*	Serve para desligar o popup
*/
let shutdownPopup = () => document.querySelector('.popup').classList.remove("popup--active")

/**
* pega todos os items do grid portfólio para uma lista
*/
let allGridContainerPortfolio = document.querySelectorAll(".full-grid__item") 


$(document).ready( () => {





	let turnOnPopup = e => {

		let imageSrc = $(e.target).attr("src")
		$("#popup__image__img").attr("src", imageSrc )	

		togglePopup()
	}
	

	allGridContainerPortfolio.
		forEach( e => $(e).click( ( e ) =>  turnOnPopup( e ) ) )
	

	$(popup__container__btn).click( () => {
		togglePopup()
	})



	shutdownPopup()



})