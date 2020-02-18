import Colors from "../../constants/Colors"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const style = {
	gridImg: {
		borderRadius: 0,
		height: width / 3,
		justifyContent: "flex-end",
		marginTop: 0,
		width: width / 3
	},
	listContainer: {
		flex: 1,
		width: "100%"
	},
	pictureGrid: {
		flex: 1,
		width: "100%"
	}
}
