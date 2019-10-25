import * as constants from "../constants"

export const searchCats = ({ page, q }) => dispatch => {
	fetch(`${constants.BASE_URL}api/cats/browse?q=${q}&page=${page}`, {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(response => response.json())
		.then(json => {
			console.log(json)
			dispatch({
				type: constants.SEARCH_CATS,
				payload: json
			})
		})
		.catch(error => {
			console.error(error)
		})
}
