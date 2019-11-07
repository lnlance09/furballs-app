import * as constants from "@redux/types"

const initial = () => ({})

const profile = (state = initial(), action) => {
	const payload = action.payload

	switch (action.type) {
		case constants.FETCH_USER:
			return {
				...state,
				userCatCount: parseInt(payload.catCount, 10),
				userCatImages: payload.catImages,
				cats: payload.cats,
				user: payload.user
			}

		case constants.LOGIN:
			return {
				...state,
				user: payload.user,
			}

		case constants.LOGOUT:
			return {
				...state,
				user: null,
				userId: null
			}

		case constants.RESET_PASSWORD:
			return {
				...state
			}

		case constants.SET_USER_ID:
			return {
				...state,
				userId: payload.userId
			}

		default:
			return state
	}
}

export default profile
