import * as constants from "@redux/types"
import axios from "axios"
import queryString from "query-string"
import { Toast } from "native-base"
import {
	deleteItemFromStorage,
	getItemFromStorage,
	saveItemToStorage
} from "@tools/storageFunctions"
import { addToS3 } from "@tools/awsFunctions"
import { AsyncStorage } from "react-native"

export const fetchUser = ({ id }) => async dispatch => {
	return await axios
		.get(`${constants.BASE_URL}api/users/get?id=${id}`)
		.then(response => {
			const { data } = response
			if (data.error) {
				return
			}

			dispatch({
				payload: data,
				type: constants.FETCH_USER
			})
		})
		.catch(error => {
			console.error(error)
			return error
		})
}

export const getAsyncStorage = () => async dispatch => {
	AsyncStorage.getItem("user").then(result => {
		const user = JSON.parse(result)
		AsyncStorage.getItem("token").then(token => {
			dispatch(setUserData({ token, user }))
		})
	})
}

export const login = ({ email, navigate, password, redirect }) => async dispatch => {
	return await axios
		.post(
			`${constants.BASE_URL}api/users/login`,
			queryString.stringify({
				email,
				password
			})
		)
		.then(async response => {
			const { data } = response
			if (data.error) {
				Toast.show({
					buttonText: null,
					style: {
						bottom: 64
					},
					text: data.error,
					type: "danger"
				})
				return
			}

			const { token, user } = data
			await dispatch( await setUserData({ token, user }))

			if (user.email_verified === "0") {
				navigate("VerificationCode")
				return
			}

			navigate("Profile")
		})
		.catch(error => {
			console.error(error)
			return error
		})
}

export const logout = () => async dispatch => {
	await deleteItemFromStorage("user")
	await deleteItemFromStorage("token")
	dispatch({
		type: constants.LOGOUT
	})
}

export const register = ({ email, name, navigate, password, username }) => async dispatch => {
	return await axios
		.post(
			`${constants.BASE_URL}api/users/register`,
			queryString.stringify({
				email,
				name,
				password,
				username
			})
		)
		.then(async response => {
			const { data } = response
			if (data.error) {
				Toast.show({
					buttonText: null,
					style: {
						bottom: 64
					},
					text: data.error,
					type: "danger"
				})
				return
			}

			const { token, user } = data
			await dispatch(await setUserData({ token, user }))
			navigate("VerificationCode")
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

export const setUserData = ({ token, user }) => async dispatch => {
	if (token) {
		await saveItemToStorage("token", token)
	}

	await saveItemToStorage("user", JSON.stringify(user))

	await dispatch({
		payload: {
			token,
			user
		},
		type: constants.SET_USER_DATA
	})
}

export const updateUser = ({ bearer, data, id }) => async dispatch => {
	const postData = JSON.stringify({
		data,
		id
	})
	const headers = {
		Authorization: bearer
	}

	return await fetch(`${constants.BASE_URL}api/users/update`, {
			body: postData,
			headers,
			method: "POST"
		})
		.then(response => {
			return response.json()
		})
		.then(json => {
			if (json.error) {
				return
			}

			dispatch({
				payload: json,
				type: constants.SET_USER_DATA
			})
		})
		.catch(error => {
			console.error(error)
		})
}

export const verifyEmail = ({ bearer, code, correctCode, id, navigate }) => async dispatch => {
	if (code === correctCode) {
		let user = await getItemFromStorage()
		user = JSON.parse(user)
		user.email_verified = "1"
		await saveItemToStorage("user", JSON.stringify(user))

		await dispatch(
			await updateUser({
				bearer,
				data: {
					email_verified: 1
				},
				id
			})
		)

		navigate("Profile")
		return
	}

	Toast.show({
		buttonText: null,
		style: {
			bottom: 64
		},
		text: "That code is incorrect",
		type: "danger"
	})
}