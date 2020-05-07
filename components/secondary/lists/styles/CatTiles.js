import Colors from "@constants/Colors"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const style = {
	catTileHeader: {
		fontSize: 18,
		marginLeft: 5,
		marginTop: 5
	},
	flatListContainer: {
		paddingHorizontal: 7,
		width: "100%"
	},
	imgBackground: {
		// borderRadius: 4,
		// borderWidth: 8,
		height: 200,
		width: "100%"
	}
}