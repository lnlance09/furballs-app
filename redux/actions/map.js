import * as constants from "@redux/types"

export const searchCats = ({ page, q }) => dispatch => {
	fetch(`${constants.BASE_URL}api/cats/browse?q=${q}&page=${page}`, {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(response => response.json())
		.then(json => {
			console.log("search cats action")
			console.log(json)
			dispatch({
				type: constants.SEARCH_CATS,
				page,
				payload: json
			})
		})
		.catch(error => {
			console.error(error)
		})
}

export const searchCatsByLocation = ({ lat, lon }) => dispatch => {
	fetch(`${constants.BASE_URL}api/cats/browseCatsByLocation?lat=${lat}&lon=${lon}`, {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(response => response.json())
		.then(json => {
			console.log("location")
			console.log(json)
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

export const toggleCatListRefeshing = () => dispatch => {
	dispatch({
		type: constants.TOGGLE_CAT_LIST_REFRESHING
	})
}
