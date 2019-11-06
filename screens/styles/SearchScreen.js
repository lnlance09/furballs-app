import Colors from "../../constants/Colors"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const style = {
	container: {
		backgroundColor: "#fff",
		flex: 1
	},
	cardContainer: {
		flex: 0
	},
	catCardImg: {
		borderRadius: 4,
		flex: 1,
		height: 160,
		width: "100%"
	},
	catCardDescription: {
		fontSize: 14,
		marginTop: 10
	},
	mapMarkerIcon: {
		fontSize: 12
	},
	scrollView: {
		marginHorizontal: 6
	}
}
