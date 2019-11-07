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

export const likeCat = ({ bearer, id }) => dispatch => {
	fetch(`${constants.BASE_URL}api/cats/likeCat`, {
		body: JSON.stringify({
			// email,
			cat_id: id
		}),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		method: "POST"
	})
		.then(response => response.json())
		.then(json => {
			console.log("like cat")
			console.log(json)
			dispatch({
				type: constants.LIKE_CAT,
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

export const unlikeCat = ({ bearer, id }) => dispatch => {
	fetch(`${constants.BASE_URL}api/cats/unlikeCat`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	})
		.then(response => response.json())
		.then(json => {
			console.log("like cat")
			console.log(json)
			dispatch({
				type: constants.UNLIKE_CAT,
				payload: json
			})
		})
		.catch(error => {
			console.error(error)
		})
}
