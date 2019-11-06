import * as constants from "@redux/types"

export const getCat = ({ id }) => dispatch => {
	fetch(`${constants.BASE_URL}api/cats/getCat?id=${id}`, {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(response => response.json())
		.then(json => {
			console.log("get cat")
			console.log(json)
			dispatch({
				type: constants.GET_CAT,
				payload: json
			})
		})
		.catch(error => {
			console.error(error)
		})
}

export const resetCat = () => dispatch => {
	dispatch({
		type: constants.RESET_CAT
	})
}

export const toggleCatPageEditing = () => dispatch => {
	dispatch({
		type: constants.TOGGLE_CAT_EDITING_PAGE
	})
}
