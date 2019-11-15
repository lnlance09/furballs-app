import Colors from "../../constants/Colors"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const style = {
	formContainer: {
		flex: 1,
		paddingHorizontal: 8,
		paddingVertical: 5
	},
	formSubText: {
		fontSize: 14,
		marginTop: 8,
		textAlign: "left"
	},
	formSubmitBtn: {
		backgroundColor: Colors.blue,
		borderRadius: 0,
		marginTop: 10
	},
	formSubmitBtnText: {
		fontWeight: "bold"
	},
	logo: {
		borderRadius: 120 / 2,
		height: 120,
		overflow: "hidden",
		width: 120
	},
	textInput: {
		// paddingTop: 2
	},
	usernameText: {
		fontSize: 13,
		marginTop: 4,
		textAlign: "center",
		width: "100%"
	}
}
