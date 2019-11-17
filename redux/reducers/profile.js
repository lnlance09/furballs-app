import * as constants from "@redux/types"

const initial = () => ({
	user: {
		id: null
	}
})

const profile = (state = initial(), action) => {
	const payload = action.payload

	switch (action.type) {
		case constants.FETCH_USER:
			return {
				...state,
				user: payload.user
			}

		case constants.LOGIN:
			return {
				...state,
				token: payload.token,
				user: payload.user
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

		case constants.RESET_PASSWORD:
			return {
				...state
			}

		case constants.SET_INITIAL_USER_DATA:
			return {
				...state,
				user: action.user
			}

		case constants.SUBMIT_VERIFICATION_CODE:
			return {
				...state
			}

		default:
			return state
	}
}

export default profile
