import Colors from "@constants/Colors"
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
		height: "80%"
		// flex: 0.1
	},
	cameraView: {
		flex: 1
	},
	permissionBtn: {
		backgroundColor: Colors.white,
		borderColor: Colors.blue,
		marginHorizontal: 7,
		marginTop: 24
	},
	permissionBtnText: {
		color: Colors.blue
	},
	permissionView: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center"
	},
	tabBarUnderlineStyle: {
		height: 0
	},
	tabBarContainerStyle: {
		borderBottomWidth: 0
	},
	tabHeading: {
		backgroundColor: Colors.white
	},
	tabText: {
		color: Colors.black
	}
}
