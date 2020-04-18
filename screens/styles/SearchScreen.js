import Colors from "@constants/Colors"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const style = {
	container: {
		backgroundColor: Colors.white,
		flex: 1
	},
	cardContainer: {
		flex: 0
	},
	catCardDescription: {
		fontSize: 14,
		marginTop: 10
	},
	scrollView: {
		marginHorizontal: 6
	},
	spinnerStyle: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center"
	}
}
