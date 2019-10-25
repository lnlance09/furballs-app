import React from "react"
import { Platform, View } from "react-native"
import { createStackNavigator, createBottomTabNavigator } from "react-navigation"
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
	tabBarIcon: ({ focused }) => (
		<View
			style={{
				backgroundColor: "#FF7121",
				borderRadius: 100,
				paddingTop: 10,
				height: 80,
				width: 80
			}}
		>
			<TabBarIcon
				color="#fff"
				name={Platform.OS === "ios" ? "ios-camera" : "md-camera"}
				size={55}
				style={{
					marginLeft: 19
				}}
			/>
		</View>
	)
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
			name={Platform.OS === "ios" ? "ios-search" : "md-search"}
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
		tabBarOptions: { showLabel: false }
	}
)

tabNavigator.path = ""

export default tabNavigator
