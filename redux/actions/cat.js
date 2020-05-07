import * as constants from "@redux/types"
import axios from "axios"
import queryString from "query-string"
import { Toast } from "native-base"
import { addToS3 } from "@tools/awsFunctions"
import { randomString } from "@tools/textFunctions"

export const addCatPic = ({ bearer, img, lat, lon }) => dispatch => {
	const fileName = `${randomString(32)}.jpg`
	dispatch(addToS3({ contentType: "image/jpeg", fileName, img }))
}

export const getCat = ({ id }) => async dispatch => {
	return await axios
		.get(`${constants.BASE_URL}api/cats/get?id=${id}`)
		.then(response => {
			const { data } = response
			console.log(data)
			if (data.error) {
				return
			}

			dispatch({
				payload: data,
				type: constants.GET_CAT
			})
		})
		.catch(error => {
			console.error(error)
			return error
		})
}

export const likeCat = ({ bearer, id }) => async dispatch => {
	return await axios
		.post(
			`${constants.BASE_URL}api/cats/like`,
			queryString.stringify({
				id
			})
		)
		.then(response => {
			const { data } = response
			if (data.error) {
				return
			}

			dispatch({
				payload: data,
				type: constants.LIKE_CAT
			})
		})
		.catch(error => {
			console.error(error)
			return error
		})
}

export const resetCat = () => dispatch => {
	dispatch({
		type: constants.RESET_CAT
	})
}

export const searchCatsByLocation = ({ lat, lon }) => async dispatch => {
	return await axios
		.get(`${constants.BASE_URL}api/cats/browseCatsByLocation?lat=${lat}&lon=${lon}`)
		.then(response => {
			const { data } = response
			if (data.error) {
				return
			}

			dispatch({
				payload: data,
				type: constants.SEARCH_CATS_BY_LOCATION
			})
		})
		.catch(error => {
			console.error(error)
			return error
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

export const unlikeCat = ({ bearer, id }) => async dispatch => {
	return await axios
		.post(
			`${constants.BASE_URL}api/cats/unlike`,
			queryString.stringify({
				id
			})
		)
		.then(response => {
			const { data } = response
			if (data.error) {
				return
			}

			dispatch({
				payload: data,
				type: constants.UNLIKE_CAT
			})
		})
		.catch(error => {
			console.error(error)
			return error
		})
}