import * as constants from "@redux/types"
import { Toast } from "native-base"
import { addToS3 } from "@tools/awsFunctions"
import { randomString } from "@tools/textFunctions"

export const addCatPic = ({ bearer, img, lat, lon }) => dispatch => {
	const fileName = `${randomString(32)}.jpg`
	dispatch(addToS3({ contentType: "image/jpeg", fileName, img }))
}

export const getCat = ({ bearer, id }) => dispatch => {
	let headers = {
		"Content-Type": "application/json"
	}

	if (bearer) {
		headers.Authorization = bearer
	}

	console.log(bearer)

	fetch(`${constants.BASE_URL}api/cats/get?id=${id}`, {
		headers
	})
		.then(response => {
			console.log(response)
			return response.json()
		})
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

	fetch(`${constants.BASE_URL}api/cats/like`, {
		body: JSON.stringify({
			cat_id: id
		}),
		headers,
		method: "POST"
	})
		.then(response => {
			console.log("like cat response")
			console.log(response)
			return response.json()
		})
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
	dispatch({
		payload: region,
		type: constants.SET_REGION
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

	fetch(`${constants.BASE_URL}api/cats/unlike`, {
		body: JSON.stringify({
			cat_id: id
		}),
		headers,
		method: "POST"
	})
		.then(response => response.json())
		.then(json => {
			dispatch({
				payload: json,
				type: constants.UNLIKE_CAT
			})
		})
		.catch(error => {
			console.error(error)
		})
}
