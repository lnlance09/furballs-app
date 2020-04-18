import Colors from "@constants/Colors"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const style = {
	container: {
		flex: 1,
		paddingHorizontal: 8,
		paddingVertical: 5
	},
	formSubmitBtn: {
		backgroundColor: Colors.yellow,
		borderColor: Colors.yellow,
		marginTop: 10
	},
	formSubmitBtnText: {
		fontWeight: "bold"
	},
	formSubText: {
		fontSize: 14,
		marginTop: 8,
		textAlign: "left"
	},
	verifyText: {
		fontSize: 24,
		textAlign: "center"
	}
}
