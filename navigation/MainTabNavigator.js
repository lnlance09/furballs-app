import React from "react"
import { Platform, View } from "react-native"
import { createBottomTabNavigator, createStackNavigator } from "react-navigation"
import { fromLeft } from "react-navigation-transitions"
import TabBarIcon from "@components/primary/TabBarIcon"
import AboutScreen from "@screens/AboutScreen"
import CameraRollScreen from "@screens/CameraRollScreen"
import CaptureScreen from "@screens/CaptureScreen"
import CatScreen from "@screens/CatScreen"
import CatTypeSelectionScreen from "@screens/CatTypeSelectionScreen"
import ChangePasswordScreen from "@screens/ChangePasswordScreen"
import EditPhotoScreen from "@screens/EditPhotoScreen"
import HomeScreen from "@screens/HomeScreen"
import LoginScreen from "@screens/LoginScreen"
import MapScreen from "@screens/MapScreen"
import ProfileScreen from "@screens/ProfileScreen"
import VerificationCodeScreen from "@screens/VerificationCodeScreen"
import Colors from "@constants/Colors"

const config = Platform.select({
	default: {},
	transitionConfig: () => fromLeft(),
	web: {
		headerMode: "screen"
	}
})

// Capture stack
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
		CatTypeSelection: {
			screen: CatTypeSelectionScreen
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

// Cat stack
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

// Home stack
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

// Map stack
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

// Profile stack
const ProfileStack = createStackNavigator(
	{
		Profile: {
			screen: ProfileScreen
		},
		Login: {
			screen: LoginScreen
		},
		VerificationCode: {
			screen: VerificationCodeScreen
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

// About stack
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

// Tab navigator
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
			tabBarVisible: false
		}),
		tabBarOptions: {
			style: {
				// borderTopColor: "transparent"
			},
			showLabel: false
		},
		transitionConfig: () => fromLeft()
	}
)

tabNavigator.path = ""

export default tabNavigator