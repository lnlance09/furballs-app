import * as constants from "@redux/types"

const initial = () => ({
	listCats: [],
	listPage: 0,
	listRefreshing: false,
	mapCats: []
})

const map = (state = initial(), action) => {
	const payload = action.payload

	switch (action.type) {
		case constants.SEARCH_CATS_BY_LOCATION:
			return {
				...state,
				mapCats: payload.cats
			}

		case constants.SET_REGION:
			return {
				...state,
				region: {
					latitude: payload.latitude,
					longitude: payload.longitude
				}
			}

		default:
			return state
	}
}

export default map
