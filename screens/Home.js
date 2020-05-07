import { style } from "./styles/Home"
import { connect } from "react-redux"
import { Container } from "native-base"
import { StyleSheet } from "react-native"
import AppHeader from "@components/primary/AppHeader"
import CatTiles from "@components/secondary/lists/CatTiles"
import PropTypes from "prop-types"
import React, { Component } from "react"

const styles = StyleSheet.create(style)

class HomeScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	componentDidMount() {}

	render() {
		const { navigate } = this.props.navigation

		return (
			<Container style={styles.container}>
				<AppHeader title="Cativity" />
				<CatTiles navigate={navigate} />
			</Container>
		)
	}
}

HomeScreen.navigationOptions = {
	header: null
}

HomeScreen.propTypes = {
	navigation: PropTypes.object
}

HomeScreen.defaultProps = {
	selected: false
}

const mapStateToProps = (state, ownProps) => {
	return {
		...state.app,
		...ownProps
	}
}

export default connect(
	mapStateToProps,
	{}
)(HomeScreen)