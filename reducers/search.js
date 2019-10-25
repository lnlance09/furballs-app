import * as constants from "../constants"

const initial = () => ({})

const search = (state = initial(), action) => {
	const payload = action.payload

	switch (action.type) {
		case constants.SEARCH_CATS:
			return {
				cats: payload.cats
			}

		default:
			return state
	}
}

export default search
