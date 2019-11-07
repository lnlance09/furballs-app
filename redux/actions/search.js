import * as constants from "@redux/types"

export const searchResources = ({ city, state }) => dispatch => {
	const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?input=cat shelters in ${city},${state}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyD0Hd-I0mmRVa3WxTy-lpNJ-xAyDqWWTxM`
	console.log(url)
	fetch(url, {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(response => {
			console.log(response)
			return response.json()
		})
		.then(json => {
			console.log("resources")
			console.log(json)
			dispatch({
				type: constants.SEARCH_RESOURCES,
				payload: json
			})
		})
		.catch(error => {
			console.error(error)
		})
}
