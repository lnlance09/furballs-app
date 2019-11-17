import * as constants from "@redux/types"

const initial = () => ({
	loading: true
})

const app = (state = initial(), action) => {
	const payload = action.payload

	switch (action.type) {
		case constants.GET_CAT:
			if (payload.error) {
				return {
					...state,
					error: true
				}
			}

			return {
				...state,
				cat: {
					description: payload.cat.description,
					homeless: payload.cat.homeless === "1",
					id: payload.cat.id,
					img: payload.cat.img,
					lastLocationTime: payload.cat.last_location_time,
					lat: parseFloat(payload.cat.lat),
					likeCount: payload.cat.like_count,
					likedByMe: payload.cat.liked_by_me === 1,
					lon: parseFloat(payload.cat.lon),
					mealCount: parseInt(payload.cat.meal_count, 10),
					meals: payload.cat.meal_count > 0 ? JSON.parse(payload.cat.meals) : null,
					name: payload.cat.name,
					pattern: payload.cat.pattern,
					pics: payload.cat.pic_count > 0 ? JSON.parse(payload.cat.pics) : null,
					picCount: parseInt(payload.cat.pic_count, 10),
					userId: payload.cat.user_id
				},
				error: false,
				loading: false
			}

		case constants.LIKE_CAT:
			if (payload.error) {
				return {
					...state
				}
			}

			return {
				...state,
				cat: {
					...state.cat,
					likedByMe: true
				}
			}

		case constants.RESET_CAT:
			return {
				...state,
				cat: {
					id: null,
					likedByMe: false
				},
				error: false,
				loading: true
			}

		case constants.TOGGLE_CAT_EDITING_PAGE:
			return {
				...state,
				editing: !state.editing
			}

		case constants.UNLIKE_CAT:
			if (payload.error) {
				return {
					...state
				}
			}

			return {
				...state,
				cat: {
					...state.cat,
					likedByMe: false
				}
			}

		default:
			return state
	}
}

export default app
