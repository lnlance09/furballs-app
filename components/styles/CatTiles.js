import Colors from "../../constants/Colors"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const style = {
	container: {
		backgroundColor: "#fff",
		marginHorizontal: 6,
		marginVertical: 0,
		marginTop: 0,
		paddingTop: 0,
		paddingVertical: 0
	},
	contentContainer: {
		paddingTop: 0
	},
	listContainer: {
		marginHorizontal: 0,
		marginTop: 5,
		paddingBottom: 70,
		paddingHorizontal: 0,
		width: "100%"
	},
	pictureGrid: {
		marginHorizontal: 2,
		width: "99%"
	}
}
