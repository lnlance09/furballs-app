import * as constants from "@redux/types"
import {
	deleteItemFromStorage,
	getItemFromStorage,
	saveItemToStorage
} from "../../tools/storageFunctions"
import { Toast } from "native-base"

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
			dispatch({
				type: constants.FETCH_USER,
				payload: json
			})
		})
		.catch(error => {
			console.error(error)
		})
}

export const getLikedCats = ({ id }) => dispatch => {
	fetch(`${constants.BASE_URL}api/users/getLikedCats?id=${id}`, {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(response => response.json())
		.then(json => {
			dispatch({
				type: constants.GET_LIKED_CATS,
				payload: json
			})
		})
		.catch(error => {
			console.error(error)
		})
}

export const login = ({ email, navigate, password }) => dispatch => {
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
				navigate("Profile")
				saveItemToStorage("user", JSON.stringify(json.user))
			}

			dispatch({
				payload: json,
				type: constants.LOGIN
			})
		})
		.catch(error => {
			console.error(error)
		})
}

export const logout = () => dispatch => {
	deleteItemFromStorage("user")
	dispatch({
		type: constants.LOGOUT
	})
}

export const register = ({ email, name, navigate, password, username }) => dispatch => {
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
				navigate("VerificationCode")
				saveItemToStorage("user", JSON.stringify(json.user))

				dispatch({
					payload: json,
					type: constants.REGISTER
				})
			}
		})
		.catch(error => {
			console.error(error)
		})
}

export const resetPassword = ({ email, navigate }) => dispatch => {
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
		.then(response => response.json())
		.then(json => {
			if (json.error) {
				Toast.show({
					buttonText: null,
					text: "A user with that email or username does not exist",
					type: "danger"
				})
			} else {
				saveItemToStorage("email", email)
				navigate("VerificationCode")
			}

			dispatch({
				payload: json,
				type: constants.RESET_PASSWORD
			})
		})
		.catch(error => {
			console.error(error)
		})
}

export const submitVerificationCode = ({ code, email, navigate }) => dispatch => {
	fetch(`${constants.BASE_URL}api/users/submitVerificationCode`, {
		body: JSON.stringify({
			code,
			email
		}),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		method: "POST"
	})
		.then(response => response.json())
		.then(json => {
			console.log(json)
			if (json.error) {
				Toast.show({
					buttonText: null,
					text: json.error,
					type: "danger"
				})
			} else {
				navigate("ChangePassword")
			}

			dispatch({
				payload: json,
				type: constants.SUBMIT_VERIFICATION_CODE
			})
		})
		.catch(error => {
			console.error(error)
		})
}

export const toggleCatGridRefeshing = () => dispatch => {
	dispatch({
		type: constants.TOGGLE_CAT_GRID_REFRESHING
	})
}

