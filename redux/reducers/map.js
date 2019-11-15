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
		case constants.SEARCH_CATS:
			const listCats = action.page === 0 ? payload.cats : state.listCats.concat(payload.cats)
			return {
				...state,
				listCats,
				listHasMore: payload.hasMore,
				listPage: payload.hasMore ? parseInt(state.listPage, 10) + 1 : state.listPage,
				listPages: payload.pages,
				listRefreshing: false
			}

		case constants.SEARCH_CATS_BY_LOCATION:
			console.log(payload.cats)
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

		case constants.TOGGLE_CAT_LIST_REFRESHING:
			return {
				...state,
				refreshing: !state.refreshing
			}

		default:
			return state
	}
}

export default map
