import * as constants from "@redux/types"

export const searchCatsByLocation = ({ lat, lon }) => dispatch => {
	fetch(`${constants.BASE_URL}api/cats/browseCatsByLocation?lat=${lat}&lon=${lon}`, {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(response => response.json())
		.then(json => {
			dispatch({
				payload: json,
				type: constants.SEARCH_CATS_BY_LOCATION
			})
		})
		.catch(error => {
			console.error(error)
		})
}

export const setRegion = region => dispatch => {
	const lat = region.latitude
	const lon = region.longitude
	dispatch({
		payload: region,
		type: constants.SET_REGION
	})
}
