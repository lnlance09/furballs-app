import Colors from "../../constants/Colors"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const style = {
	closeModalIcon: {
		color: Colors.white,
		marginHorizontal: 20,
		marginTop: 50
	},
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
	logo: {
		borderRadius: 120 / 2,
		height: 120,
		overflow: "hidden",
		width: 120
	},
	tabBarUnderlineStyle: {
		backgroundColor: Colors.black
	},
	tabBarContainerStyle: {
		borderBottomWidth: 0
	},
	tabHeading: {
		backgroundColor: Colors.white
	},
	tabText: {
		color: Colors.black
	},
	usernameText: {
		fontSize: 13,
		marginTop: 4,
		textAlign: "center",
		width: "100%"
	}
}
