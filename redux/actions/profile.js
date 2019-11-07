import * as constants from "@redux/types"
import { AsyncStorage } from "react-native"
import { Toast } from "native-base"

const deleteUserId = async () => {
	try {
		await AsyncStorage.removeItem("userId")
	} catch (error) {
		console.log(error.message)
	}
}

const getUserId = async () => {
	let user = ""
	try {
		user = (await AsyncStorage.getItem("userId")) || null
	} catch (error) {
		console.log(error.message)
	}

	return user
}

const saveUserId = async userId => {
	try {
		await AsyncStorage.setItem("userId", userId)
	} catch (error) {
		console.log(error.message)
	}
}

export const fetchUser = ({ id }) => dispatch => {
	fetch(`${constants.BASE_URL}api/users/getUser?id=${id}`, {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(response => response.json())
		.then(json => {
			console.log("fetch user")
			console.log(json)

			if (!json.error) {
				dispatch({
					type: constants.SET_USER_ID,
					payload: {
						userId: json.user.id
					}
				})
			}

			dispatch({
				type: constants.FETCH_USER,
				payload: json
			})
		})
		.catch(error => {
			console.error(error)
		})
}

export const getCurrentUser = () => dispatch => {
	const userId = getUserId()
	dispatch({
		type: constants.SET_USER_ID,
		payload: {
			userId
		}
	})

	return userId
}

export const login = ({ email, password }) => dispatch => {
	fetch(`${constants.BASE_URL}api/users/login`, {
		body: JSON.stringify({
			email,
			password
		}),
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST"
	})
		.then(response => response.json())
		.then(json => {
			console.log("login")
			console.log(json)
			if (json.error) {
				Toast.show({
					buttonText: null,
					text: "Wrong password",
					type: "danger"
				})
			} else {
				saveUserId(json.user.id)
				dispatch({
					type: constants.SET_USER_ID,
					payload: {
						userId: json.user.id
					}
				})
			}

			dispatch({
				type: constants.LOGIN,
				payload: json
			})
		})
		.catch(error => {
			console.error(error)
		})
}

export const logout = () => dispatch => {
	deleteUserId()
	dispatch({
		type: constants.LOGOUT
	})
}

export const register = ({ email, name, password, username }) => dispatch => {
	fetch(`${constants.BASE_URL}api/users/register`, {
		body: JSON.stringify({
			email,
			name,
			password,
			username
		}),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		method: "POST"
	})
		.then(response => {
			console.log("register body")
			console.log(response)
			return response.json()
		})
		.then(json => {
			console.log("register")
			console.log(json)

			if (json.error) {
				Toast.show({
					buttonText: null,
					text: "There was an error",
					type: "danger"
				})
			} else {
				saveUserId(json.user.id)
			}

			dispatch({
				type: constants.REGISTER,
				payload: json
			})
		})
		.catch(error => {
			console.error(error)
		})
}

export const resetPassword = ({ email }) => dispatch => {
	fetch(`${constants.BASE_URL}api/users/resetPassword`, {
		body: JSON.stringify({
			email
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
			dispatch({
				type: constants.RESET_PASSWORD,
				payload: json
			})
		})
		.catch(error => {
			console.error(error)
		})
}

