import * as constants from "../constants"

const initial = () => ({})

const profile = (state = initial(), action) => {
	const payload = action.payload

	switch (action.type) {
		case constants.FETCH_USER:
			return {
				user: payload.user
			}

		case constants.LOGIN:
			return {
				user: payload.user
			}

		default:
			return state
	}
}

export default profile
