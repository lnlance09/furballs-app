import Colors from "../../constants/Colors"
import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const style = {
	closeModalIcon: {
		color: Colors.white,
		marginHorizontal: 20,
		marginTop: 50
	},
	formContainer: {
		flex: 1,
		paddingHorizontal: 8,
		paddingVertical: 5
	},
	formSubText: {
		fontSize: 12,
		marginTop: 8,
		textAlign: "left"
	},
	formSubmitBtn: {
		marginTop: 10
	},
	formSubmitBtnText: {
		fontWeight: "bold"
	},
	h1: {
		fontSize: 24,
		marginTop: 0,
		textAlign: "center",
		width: "100%"
	},
	imageWrapper: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 5,
		paddingVertical: 10
	},
	logo: {
		borderRadius: 120 / 2,
		height: 120,
		overflow: "hidden",
		width: 120
	},
	myCatsH2: {
		fontSize: 18,
		marginBottom: 0,
		marginHorizontal: 10,
		marginTop: 8,
		textAlign: "left",
		width: "100%"
	},
	textInput: {
		height: 43,
		fontSize: 14,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#eaeaea",
		backgroundColor: "#fafafa",
		paddingLeft: 10,
		marginTop: 5,
		marginBottom: 5
	},
	usernameText: {
		fontSize: 13,
		marginTop: 4,
		textAlign: "center",
		width: "100%"
	}
}
