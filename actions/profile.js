import * as constants from "../constants"

export const fetchUser = ({ id }) => dispatch => {
	fetch(`${constants.BASE_URL}api/users/getUser?id=${id}`, {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(response => response.json())
		.then(json => {
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
			dispatch({
				type: constants.LOGIN,
				payload: json
			})
		})
		.catch(error => {
			console.error(error)
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
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		method: "POST",
	})
		.then(response => {
			console.log("register body")
			console.log(response)
			return response.json()
		})
		.then(json => {
			console.log("register")
			console.log(json)
			dispatch({
				type: constants.REGISTER,
				payload: json
			})
		})
		.catch(error => {
			console.error(error)
		})
}
