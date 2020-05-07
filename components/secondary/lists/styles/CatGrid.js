import Colors from "@constants/Colors"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const style = {
	emptyMsg: {
		alignItems: "center",
		flex: 1,
		marginTop: 45,
		textAlign: "center"
	},
	gridImg: {
		borderRadius: 0,
		height: width / 3,
		justifyContent: "flex-end",
		width: width / 3
	},
	listContainer: {
		flex: 1,
		marginTop: 5,
		width: "100%"
	},
	pictureGrid: {
		flex: 1,
		marginHorizontal: 7
	}
}
