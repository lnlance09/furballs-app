import * as constants from "@redux/types"
import { Toast } from "native-base"
import {
	deleteItemFromStorage,
	getItemFromStorage,
	saveItemToStorage
} from "@tools/storageFunctions"
import { addToS3 } from "@tools/awsFunctions"

export const fetchUser = ({ id }) => dispatch => {
	fetch(`${constants.BASE_URL}api/users/get?id=${id}`, {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(response => {
			console.log("response fetch user")
			console.log(response)
			return response.json()
		})
		.then(json => {
			dispatch({
				payload: json,
				type: constants.FETCH_USER
			})
		})
		.catch(error => {
			console.error(error)
		})
}

export const login = ({ email, navigate, password, redirect, verified }) => async dispatch => {
	return await fetch(`${constants.BASE_URL}api/users/login`, {
		body: JSON.stringify({
			email,
			password
		}),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		method: "POST"
	})
		.then(response => {
			console.log("response login")
			console.log(response)
			return response.json()
		})
		.then(json => {
			console.log("login action")
			console.log(json)
			console.log(email)
			console.log(password)

			if (json.error) {
				Toast.show({
					buttonText: null,
					style: {
						bottom: 64
					},
					text: "There was an error",
					type: "danger"
				})
				return json
			}

			json.user.email_verified = verified
			dispatch(setUserData({ token: json.token, user: json.user }))

			if (redirect) {
				navigate("Profile")
			}

			return json
		})
		.catch(error => {
			return error
			console.error(error)
		})
}

export const logout = () => dispatch => {
	deleteItemFromStorage("user")
	deleteItemFromStorage("token")
	dispatch({
		type: constants.LOGOUT
	})
}

export const register = ({ email, name, navigate, password, username, uuid }) => dispatch => {
	fetch(`${constants.BASE_URL}api/users/register`, {
		body: JSON.stringify({
			email,
			name,
			password,
			username,
			uuid
		}),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		method: "POST"
	})
		.then(response => {
			return response.json()
		})
		.then(json => {
			if (json.error) {
				Toast.show({
					buttonText: null,
					style: {
						bottom: 64
					},
					text: "There was an error",
					type: "danger"
				})
			} else {
				dispatch(setUserData({ token: json.token, user: json.user }))
				navigate("VerificationCode")
			}
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

export const setUserData = ({ token, user }) => {
	console.log("setUserData action")
	console.log(user)
	console.log(JSON.stringify(user))
	console.log(token)

	if (token) {
		saveItemToStorage("token", token)
	}

	saveItemToStorage("user", JSON.stringify(user))

	return {
		payload: {
			token,
			user
		},
		type: constants.SET_USER_DATA
	}
}

export const updateUser = ({ bearer, data, id }) => dispatch => {
	let headers = {
		Accept: "application/json",
		Authorization: bearer,
		"Content-Type": "application/json"
	}

	fetch(`${constants.BASE_URL}api/users/update`, {
		body: JSON.stringify({
			data,
			id: id
		}),
		headers,
		method: "POST"
	})
		.then(response => {
			console.log("updateUser response")
			console.log(response)
			return response.json()
		})
		.then(json => {
			console.log(json)
			if (!json.error) {
				dispatch({
					payload: json,
					type: constants.UPDATE_USER
				})
			}
		})
		.catch(error => {
			console.error(error)
		})
}

export const verifyEmail = () => dispatch => {
	let user = getItemFromStorage()
	user.email_verified = true

	saveItemToStorage("user", JSON.stringify(user))

	dispatch({
		type: constants.VERIFY_EMAIL
	})
}
