import AppHeader from "@components/primary/AppHeader"
import Colors from "@constants/Colors"
import PropTypes from "prop-types"
import parser from "parse-address"
import React, { Component } from "react"
import { connect } from "react-redux"
import { style } from "./styles/SearchScreen"
import { Card, CardItem, Spinner, Text } from "native-base"
import { Image, ScrollView, StyleSheet, View } from "react-native"

const styles = StyleSheet.create(style)

class AboutScreen extends Component {
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
				<AppHeader title="About" />
				<ScrollView style={styles.scrollView}>

				</ScrollView>
			</View>
		)
	}
}

AboutScreen.navigationOptions = {
	header: null
}

AboutScreen.propTypes = {

}

AboutScreen.defaultProps = {

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
)(AboutScreen)