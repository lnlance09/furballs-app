import Colors from "../../constants/Colors"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const style = {
	container: {
		backgroundColor: "#fff",
		marginVertical: 0,
		marginTop: 0,
		paddingTop: 0,
		paddingVertical: 0
	},
	contentContainer: {
		paddingTop: 0
	},
	emptyMsg: {
		alignItems: "center",
		flex: 1,
		marginTop: 45,
		textAlign: "center"
	},
	gridImg: {
		borderRadius: 4,
		height: (width / 3) - 12,
		justifyContent: 'flex-end',
		marginTop: 7,
		width: (width / 3) - 12,
	},
	listContainer: {
		flex: 1,
		marginHorizontal: 0,
		marginTop: 5,
		paddingHorizontal: 0,
		width: "100%"
	},
	pictureGrid: {
		flex: 1,
		marginHorizontal: 5,
		width: "100%"
	}
}
