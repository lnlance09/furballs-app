import Colors from "../../constants/Colors"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const style = {
	container: {
		backgroundColor: "#fff",
		marginVertical: 0,
		marginTop: 0,
		paddingTop: 0,
		paddingVertical: 0
	},
	map: {
		bottom: 0,
		height: "100%",
		left: 0,
		position: "relative",
		right: 0,
		top: 0
	},
	tabBarUnderlineStyle: {
		backgroundColor: Colors.blue
	},
	tabBarContainerStyle: {
		borderBottomWidth: 0
	},
	tabHeadingStyle: {
		backgroundColor: Colors.white
	},
	tabText: {
		color: Colors.black
	}
}