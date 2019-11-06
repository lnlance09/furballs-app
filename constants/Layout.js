import { Dimensions } from "react-native"

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

export default {
	window: {
		height,
		width
	},
	isSmallDevice: width < 375
}
