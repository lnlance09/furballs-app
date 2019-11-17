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
		backgroundColor: Colors.yellow,
		borderColor: Colors.yellow,
		marginTop: 10
	},
	formSubmitBtnText: {
		color: Colors.white
	},
	textInput: {
		// paddingTop: 2
	},
}
