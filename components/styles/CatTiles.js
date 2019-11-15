import Colors from "../../constants/Colors"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const style = {
	flatListContainer: {
		width: "100%"
	},
	nameText: {
		alignItems: "center",
		bottom: 7,
		color: Colors.white,
		fontSize: 28,
		justifyContent: "center",
		marginLeft: 7,
		position: "absolute"
	}
}
