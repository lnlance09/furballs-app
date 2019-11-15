import * as constants from "@redux/types"

export const getCat = ({ bearer, id }) => dispatch => {
	let headers = {
		"Content-Type": "application/json"
	}

	if (bearer) {
		headers.Authorization = bearer
	}

	fetch(`${constants.BASE_URL}api/cats/getCat?id=${id}`, {
		headers
	})
		.then(response => response.json())
		.then(json => {
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
	let headers = {
		Accept: "application/json",
		"Content-Type": "application/json"
	}

	if (bearer) {
		headers.Authorization = bearer
	}

	fetch(`${constants.BASE_URL}api/cats/likeCat`, {
		body: JSON.stringify({
			cat_id: id
		}),
		headers,
		method: "POST"
	})
		.then(response => response.json())
		.then(json => {
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
	let headers = {
		Accept: "application/json",
		"Content-Type": "application/json"
	}

	if (bearer) {
		headers.Authorization = bearer
	}

	fetch(`${constants.BASE_URL}api/cats/unlikeCat`, {
		body: JSON.stringify({
			cat_id: id
		}),
		headers,
		method: "POST"
	})
		.then(response => response.json())
		.then(json => {
			console.log("unlike cat")
			console.log(json)
			dispatch({
				payload: json,
				type: constants.UNLIKE_CAT
			})
		})
		.catch(error => {
			console.error(error)
		})
}
