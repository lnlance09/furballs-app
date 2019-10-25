import * as constants from "../constants"

export const fetchActivity = () => dispatch => {
	fetch(`${constants.BASE_URL}api/cats/browse`, {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(response => response.json())
		.then(json => {
			// console.log(json)
			dispatch({
				type: constants.FETCH_ACTIVITY,
				payload: json
			})
		})
		.catch(error => {
			console.error(error)
		})
}
