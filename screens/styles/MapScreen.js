import Colors from "@constants/Colors"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const style = {
	container: {
		backgroundColor: Colors.white,
		flex: 1
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
		backgroundColor: Colors.black,
		height: 1
	},
	tabBarContainerStyle: {
		borderBottomWidth: 0
	},
	tabHeading: {
		backgroundColor: Colors.white
	},
	tabText: {
		color: Colors.black
	}
}
