import * as constants from "@redux/types"

const initial = () => ({})

const capture = (state = initial(), action) => {
	const payload = action.payload

	switch (action.type) {
		case constants.ADD_CAT_PIC:
			return {
				...state,
				cats: payload.cats
			}

		default:
			return state
	}
}

export default capture
