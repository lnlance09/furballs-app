import * as constants from "@redux/types"

const initial = () => ({
	resources: []
})

const search = (state = initial(), action) => {
	const payload = action.payload

	switch (action.type) {
		case constants.SEARCH_RESOURCES:
			return {
				...state,
				resources: payload.results
			}

		default:
			return state
	}
}

export default search
