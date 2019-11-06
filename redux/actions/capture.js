import * as constants from "@redux/types"

export const addCatPic = ({ img }) => dispatch => {
	fetch(`${constants.BASE_URL}api/cats/addPic`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(response => response.json())
		.then(json => {})
		.catch(error => {
			console.error(error)
		})
}
