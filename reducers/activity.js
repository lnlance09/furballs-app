import * as constants from "../constants"

const initial = () => ({})

const activity = (state = initial(), action) => {
	const payload = action.payload

	switch (action.type) {
		case constants.FETCH_ACTIVITY:
			return {
				cats: payload.cats
			}

		default:
			return state
	}
}

export default activity
