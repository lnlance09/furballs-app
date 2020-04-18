import * as constants from "@redux/types"
import Colors from "@constants/Colors"

const initial = () => ({
	loading: true,
	token: null,
	user: {
		id: null
	}
})

const user = (state = initial(), action) => {
	const payload = action.payload

	switch (action.type) {
		case constants.FETCH_USER:
			return {
				...state,
				user: {
					...state.user,
					id: payload.user.id,
					img: payload.user.img
				}
			}

		case constants.LOGOUT:
			return {
				...state,
				token: null,
				user: {}
			}

		case constants.REGISTER:
			return {
				...state,
				token: payload.token,
				user: payload.user
			}

		case constants.SET_USER_DATA:
			let user = {
				...state.user
			}

			if (payload.user !== null) {
				user = {
					...state.user,
					email: payload.user.email,
					email_verified: payload.user.email_verified,
					id: payload.user.id,
					img: payload.user.img,
					name: payload.user.name,
					username: payload.user.username,
					uuid: payload.user.sub
				}
			}

			return {
				...state,
				token: payload.token,
				user
			}

		case constants.UPDATE_USER:
			return {
				...state,
				user: {
					...state.user,
					email: payload.user.email,
					id: payload.user.id,
					img: payload.user.img,
					name: payload.user.name,
					username: payload.user.username,
					uuid: payload.user.uuid
				}
			}

		case constants.VERIFY_EMAIL:
			return {
				...state,
				user: {
					...state.user,
					email_verified: true
				}
			}

		default:
			return state
	}
}

export default user