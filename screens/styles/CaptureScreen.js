import Colors from "../../constants/Colors"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const style = {
	cameraTouchableOpacity: {
		alignItems: "center",
		alignSelf: "flex-end",
		// flex: 0.1
	},
	cameraView: {
		flex: 1
	},
	takePicText: {
		color: Colors.white,
		fontSize: 18,
		marginTop: 50
	}
}