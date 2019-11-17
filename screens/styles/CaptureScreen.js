import Colors from "../../constants/Colors"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const style = {
	cameraOptions: {
		alignItems: "center",
		backgroundColor: Colors.white,
		flex: 1,
		flexDirection: "row",
		height: 200,
		justifyContent: "center"
	},
	cameraTouchableOpacity: {
		alignItems: "center",
		alignSelf: "flex-end",
		height: "70%"
		// flex: 0.1
	},
	cameraView: {
		flex: 1
	},
}
