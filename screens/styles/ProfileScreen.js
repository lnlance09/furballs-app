import Colors from "@constants/Colors"
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
		paddingVertical: 7
	},
	usernameText: {
		fontSize: 13,
		marginTop: 4,
		textAlign: "center",
		width: "100%"
	}
}