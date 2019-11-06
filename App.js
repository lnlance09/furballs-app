import * as Font from "expo-font"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { AppLoading } from "expo"
import { Asset } from "expo-asset"
import { Root } from "native-base"
import { Provider } from "react-redux"
import { Platform, StatusBar } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import AppNavigator from "./navigation/AppNavigator"
import MonoFont from "./assets/fonts/SpaceMono-Regular.ttf"
import RobotDevImg from "./assets/images/robot-dev.png"
import RobotProdImg from "./assets/images/robot-prod.png"
import store from "./store"

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoadingComplete: false
		}
	}

	handleFinishLoading() {
		this.setState({ isLoadingComplete: true })
	}

	handleLoadingError(error) {
		console.warn(error)
	}

	async loadResourcesAsync() {
		await Promise.all([
			Asset.loadAsync([
				RobotDevImg,
				RobotProdImg
			]),
			Font.loadAsync({
				...Ionicons.font,
				"space-mono": MonoFont
			})
		])
	}

	render() {
		const { isLoadingComplete } = this.state

		if (!isLoadingComplete && !this.props.skipLoadingScreen) {
			return (
				<AppLoading
					onError={this.handleLoadingError}
					onFinish={() => this.handleFinishLoading()}
					startAsync={this.loadResourcesAsync}
				/>
			)
		}

		return (
			<Provider store={store}>
				<Root>
					{Platform.OS === "ios" && <StatusBar barStyle="default" />}
					<AppNavigator />
				</Root>
			</Provider>
		)
	}
}

App.propTypes = {
	skipLoadingScreen: PropTypes.bool
}

App.defaultProps = {

}

export default App
