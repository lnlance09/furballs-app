import AppHeader from "@components/primary/AppHeader"
import BusinessCatPic from "@assets/images/business-cat-illustration.png"
import FamilyCatPic from "@assets/images/family-cat-illustration-band.png"
import StrayCatPic from "@assets/images/street-cat-illustration.png"
import Colors from "@constants/Colors"
import PropTypes from "prop-types"
import parser from "parse-address"
import React, { Component } from "react"
import { connect } from "react-redux"
import { style } from "./styles/SearchScreen"
import { Card, CardItem, Spinner, Text } from "native-base"
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native"

const styles = StyleSheet.create(style)

class CatTypeSelectionScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	componentDidMount() {

	}

	render() {
		const { resources } = this.props

		return (
			<View style={styles.container}>
				<AppHeader title="Living Situation" />
				<ScrollView style={styles.scrollView}>
					<ImageBackground source={BusinessCatPic} style={{ height: 200, width: "100%" }}>
						<Text>This is a business cat</Text>
					</ImageBackground>

					<ImageBackground source={StrayCatPic} style={{ height: 200, width: "100%" }}>
						<Text>This is a stray cat</Text>
					</ImageBackground>

					<ImageBackground source={FamilyCatPic} style={{ height: 200, width: "100%" }}>
						<Text>This is a family v   cat</Text>
					</ImageBackground>
				</ScrollView>
			</View>
		)
	}
}

CatTypeSelectionScreen.navigationOptions = {
	header: null
}

CatTypeSelectionScreen.propTypes = {

}

CatTypeSelectionScreen.defaultProps = {

}

const mapStateToProps = (state, ownProps) => {
	return {
		...state.app,
		...ownProps
	}
}

export default connect(
	mapStateToProps,
	{

	}
)(CatTypeSelectionScreen)