import Colors from "../../constants/Colors"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const style = {
	container: {
		flex: 1,
		paddingHorizontal: 8,
		paddingVertical: 5
	},
	formSubmitBtn: {
		backgroundColor: Colors.blue,
		marginTop: 10
	},
	formSubmitBtnText: {
		color: Colors.white
	}
}
