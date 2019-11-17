import Colors from "../../constants/Colors"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const style = {
	h1: {
		fontSize: 24,
		marginTop: 0,
		textAlign: "center",
		width: "100%"
	},
	imageWrapper: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 5,
		paddingVertical: 7
	},
	myCatContainer: {
		marginLeft: 4,
		marginRight: 7
	},
	myCatsHeader: {
		fontSize: 24,
		marginLeft: 7,
		marginTop: 8
	},
	usernameText: {
		fontSize: 13,
		marginTop: 4,
		textAlign: "center",
		width: "100%"
	}
}
