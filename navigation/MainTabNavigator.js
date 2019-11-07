import React from "react"
import { Platform, View } from "react-native"
import { createBottomTabNavigator, createStackNavigator } from "react-navigation"
import TabBarIcon from "../components/TabBarIcon"
import CaptureScreen from "../screens/CaptureScreen"
import HomeScreen from "../screens/HomeScreen"
import MapScreen from "../screens/MapScreen"
import ProfileScreen from "../screens/ProfileScreen"
import SearchScreen from "../screens/SearchScreen"
import Colors from "../constants/Colors"

const config = Platform.select({
	web: {
		headerMode: "screen"
	},
	default: {}
})

// Capture stack
const CaptureStack = createStackNavigator(
	{
		Capture: CaptureScreen
	},
	config
)

CaptureStack.navigationOptions = {
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

CaptureStack.path = ""

// Home stack
const HomeStack = createStackNavigator(
	{
		Home: HomeScreen
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

HomeStack.path = ""

// Map stack
const MapStack = createStackNavigator(
	{
		Links: MapScreen
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
		Profile: ProfileScreen
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

// Search stack
const SearchStack = createStackNavigator(
	{
		Search: SearchScreen
	},
	config
)

SearchStack.navigationOptions = {
	tabBarLabel: "Search",
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

SearchStack.path = ""

// Tab navigator
const tabNavigator = createBottomTabNavigator(
	{
		HomeStack,
		MapStack,
		CaptureStack,
		SearchStack,
		ProfileStack
	},
	{
		navigationOptions: ({ navigation }) => ({
			tabBarVisible: false
		}),
		tabBarOptions: {
			style: {
				borderTopColor: "transparent"
			},
			showLabel: false
		}
	}
)

tabNavigator.path = ""

export default tabNavigator
