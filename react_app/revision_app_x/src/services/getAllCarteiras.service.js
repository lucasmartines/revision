import firebase from '../firebase.js'





export default async ( busca ) =>
{

	if( typeof busca === "string")
	{

		const data = await firebase.firestore().collection("carteira")
			.where('keywords','array-contains',busca.toLowerCase() )
			.limit(5)
			.get()

		// let query = []
		// query.push( ...busca.toLowerCase().split(" ") , busca )
		// query = query.splice(0,9) // clamp array between 0 and 9

		// const data = await firebase.firestore().collection("carteira")
		// 	.where('keywords','array-contains-any', query )
		// 	.limit(10)
		// 	.get()

		let results = []
		data.forEach( e => results.push(e.data()) );

 		return results
	}
	else{

		console.error("Bug a busca não pode ser vasio")
	}
}
