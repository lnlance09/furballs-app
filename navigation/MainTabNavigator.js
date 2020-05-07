import { Platform, View } from "react-native"
import { createBottomTabNavigator, createStackNavigator } from "react-navigation"
import { fromLeft } from "react-navigation-transitions"
import Colors from "@constants/Colors"
import TabBarIcon from "@components/primary/TabBarIcon"
import AboutScreen from "@screens/About"
import CameraRollScreen from "@screens/CameraRoll"
import CaptureScreen from "@screens/Capture"
import CatScreen from "@screens/Cat"
import CatTypeScreen from "@screens/CatType"
import ChangePasswordScreen from "@screens/ChangePassword"
import EditPhotoScreen from "@screens/EditPhoto"
import HomeScreen from "@screens/Home"
import LoginScreen from "@screens/Login"
import MapScreen from "@screens/Map"
import ProfileScreen from "@screens/Profile"
import React from "react"
import VerificationScreen from "@screens/Verification"

const config = Platform.select({
	default: {},
	transitionConfig: () => fromLeft(),
	web: {
		headerMode: "screen"
	}
})

const CaptureStack = createStackNavigator(
	{
		Capture: {
			screen: CaptureScreen
		},
		EditPhoto: {
			screen: EditPhotoScreen
		},
		CameraRoll: {
			screen: CameraRollScreen
		},
		CatType: {
			screen: CatTypeScreen
		}
	},
	config
)

CaptureStack.navigationOptions = ({ navigation }) => {
	let tabBarVisible = true
	navigation.state.routes.map(route => {
		// tabBarVisible = route.routeName !== "Capture"
	})

	return {
		showLabel: false,
		tabBarIcon: ({ focused }) => {
			return (
				<View>
					<TabBarIcon
						color={focused ? Colors.red : Colors.tabIconDefault}
						name={Platform.OS === "ios" ? "ios-add" : "md-add"}
						size={32}
						style={{
							marginBottom: -3
						}}
					/>
				</View>
			)
		},
		tabBarVisible,
		transitionConfig: () => fromLeft()
	}
}

CaptureStack.path = ""

const CatStack = createStackNavigator(
	{
		Cat: {
			screen: CatScreen
		},
		Capture: {
			screen: CaptureScreen
		}
	},
	config
)

CatStack.navigationOptions = {
	showLabel: false,
	tabBarIcon: ({ focused }) => {
		return (
			<View>
				<TabBarIcon
					color={focused ? Colors.red : Colors.tabIconDefault}
					name={Platform.OS === "ios" ? "ios-add" : "md-add"}
					size={32}
					style={{
						marginBottom: -3
					}}
				/>
			</View>
		)
	}
}

CatStack.path = "cat/:id"

const HomeStack = createStackNavigator(
	{
		Home: {
			screen: HomeScreen
		},
		Cat: {
			screen: CatScreen
		},
		Capture: {
			screen: CaptureScreen
		}
	},
	config
)

HomeStack.navigationOptions = {
	tabBarLabel: "Home",
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
			name={Platform.OS === "ios" ? "ios-home" : "md-home"}
			size={26}
			style={{
				marginBottom: -3
			}}
		/>
	)
}

HomeStack.path = "home"

const MapStack = createStackNavigator(
	{
		Map: {
			screen: MapScreen
		},
		Cat: {
			screen: CatScreen
		}
	},
	config
)

MapStack.navigationOptions = {
	tabBarLabel: "Map",
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
			name={Platform.OS === "ios" ? "ios-map" : "md-map"}
			size={26}
			style={{
				marginBottom: -3
			}}
		/>
	)
}

MapStack.path = ""

const ProfileStack = createStackNavigator(
	{
		Profile: {
			screen: ProfileScreen
		},
		Login: {
			screen: LoginScreen
		},
		VerificationCode: {
			screen: VerificationScreen
		},
		ChangePassword: {
			screen: ChangePasswordScreen
		},
		Cat: {
			screen: CatScreen
		},
		CameraRoll: {
			screen: CameraRollScreen
		}
	},
	config
)

ProfileStack.navigationOptions = {
	tabBarLabel: "Profile",
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
			name={Platform.OS === "ios" ? "ios-person" : "md-person"}
			size={26}
			style={{
				marginBottom: -3
			}}
		/>
	)
}

ProfileStack.path = ""

const AboutStack = createStackNavigator(
	{
		About: AboutScreen
	},
	config
)

AboutStack.navigationOptions = {
	tabBarLabel: "About",
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
			name={
				Platform.OS === "ios"
					? "ios-information-circle-outline"
					: "md-information-circle-outline"
			}
			size={26}
			style={{
				marginBottom: -3
			}}
		/>
	)
}

AboutStack.path = ""

const tabNavigator = createBottomTabNavigator(
	{
		HomeStack,
		MapStack,
		CaptureStack,
		AboutStack,
		ProfileStack
	},
	{
		navigationOptions: () => ({
			tabBarVisible: true
		}),
		tabBarOptions: {
			style: {
				backgroundColor: "transparent",
				// opacity: 0.2
				// borderTopColor: "transparent"
			},
			showLabel: false
		},
		transitionConfig: () => fromLeft()
	}
)

tabNavigator.path = ""

export default tabNavigator