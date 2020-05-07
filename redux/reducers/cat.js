import * as constants from "@redux/types"
import Colors from "@constants/Colors"

const initial = () => ({
	loading: true,
	token: null,
	cat: {
		id: null
	}
})

const cat = (state = initial(), action) => {
	const payload = action.payload

	switch (action.type) {
		case constants.ADD_CAT_PIC:
			return {
				...state,
				pic: payload.pic
			}

		case constants.GET_CAT:
			console.log("get cat reducer")
			console.log(payload)
			if (payload.error) {
				return {
					...state,
					error: true
				}
			}

			const livingSituation = parseInt(payload.cat.living_situation, 10)
			let imgColor = Colors.strayCat
			let livingSituationLabel = "Stray cat"
			if (livingSituation === 1) {
				imgColor = Colors.businessCat
				livingSituationLabel = "Business cat"
			}
			if (livingSituation === 2) {
				imgColor = Colors.familyCat
				livingSituationLabel = "Family cat"
			}

			return {
				...state,
				cat: {
					description: payload.cat.description,
					id: payload.cat.id,
					imgColor,
					lastLocationTime: payload.cat.last_location_time,
					lat: parseFloat(payload.cat.lat),
					likeCount: payload.cat.like_count,
					likedByMe: parseInt(payload.cat.liked_by_me, 10) === 1,
					livingSituation,
					livingSituationLabel,
					lon: parseFloat(payload.cat.lon),
					mealCount: parseInt(payload.cat.meal_count, 10),
					meals: payload.cat.meal_count > 0 ? JSON.parse(payload.cat.meals) : null,
					name: payload.cat.name,
					pics: payload.cat.pic_count > 0 ? JSON.parse(payload.cat.pics) : null,
					picCount: parseInt(payload.cat.pic_count, 10),
					userId: parseInt(payload.cat.user_id, 10)
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

export default cat