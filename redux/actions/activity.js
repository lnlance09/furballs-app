import * as constants from "@redux/types"

export const fetchActivity = ({ page }) => dispatch => {
	fetch(`${constants.BASE_URL}api/cats/browse?page=${page}`, {
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(response => response.json())
		.then(json => {
			console.log("fetchActivity")
			console.log(json)
			dispatch({
				type: constants.FETCH_ACTIVITY,
				page,
				payload: json
			})
		})
		.catch(error => {
			console.error(error)
		})
}

export const toggleCatTilesRefeshing = () => dispatch => {
	dispatch({
		type: constants.TOGGLE_CAT_TILES_REFRESHING
	})
}
