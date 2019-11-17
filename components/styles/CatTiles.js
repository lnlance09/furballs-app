import Colors from "../../constants/Colors"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const style = {
	flatListContainer: {
		paddingHorizontal: 7,
		width: "100%"
	},
	imgBackground: {
		height: 200,
		marginTop: 5,
		width: "100%"
	},
	imgBackgroundImage: {
		borderRadius: 4
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
