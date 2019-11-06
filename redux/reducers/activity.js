import * as constants from "@redux/types"

const initial = () => ({
	activityCats: [],
	page: 0,
	refreshing: false
})

const activity = (state = initial(), action) => {
	const payload = action.payload

	switch (action.type) {
		case constants.FETCH_ACTIVITY:

			const activityCats = action.page === 0 ? payload.cats : state.activityCats.concat(payload.cats)
			return {
				...state,
				activityCats,
				activityHasMore: payload.hasMore,
				activityPage: payload.hasMore ? parseInt(state.activityPage, 10) + 1 : state.activityPage,
				activityPages: payload.pages,
				activityRefreshing: false
			}

		case constants.TOGGLE_CAT_TILES_REFRESHING:
			return {
				...state,
				refreshing: !state.refreshing
			}

		default:
			return state
	}
}

export default activity
