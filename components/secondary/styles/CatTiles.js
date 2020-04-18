import Colors from "@constants/Colors"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const style = {
	flatListContainer: {
		paddingHorizontal: 7,
		width: "100%"
	},
	imgBackground: {
		borderRadius: 4,
		borderWidth: 8,
		height: 200,
		marginTop: 30,
		width: "100%"
	}
}
