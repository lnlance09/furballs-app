import * as constants from "../constants"

const initial = () => ({})

const map = (state = initial(), action) => {
	const payload = action.payload

	switch (action.type) {
		case constants.ADD_CAT_PIC:
			return {
				cats: payload.cats
			}

		default:
			return state
	}
}

export default map
