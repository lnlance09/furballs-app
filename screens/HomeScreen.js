import AppHeader from "../components/AppHeader"
import CatPage from "../components/CatPage"
import CatTiles from "../components/CatTiles"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { style } from "./styles/HomeScreen"
import { connect } from "react-redux"
import { Container } from "native-base"
import { ActivityIndicator, StyleSheet, View } from "react-native"

const styles = StyleSheet.create(style)

class HomeScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	componentDidMount() {}

	render() {
		const { cat, selected } = this.props

		return (
			<Container style={styles.container}>
				{selected ? (
					cat ? (
						<CatPage
							description={cat.description}
							homeless={cat.homeless}
							img={cat.img}
							lastLocationTime={cat.lastLocationTime}
							lat={cat.lat}
							lon={cat.lon}
							mealCount={cat.mealCount}
							meals={cat.meals}
							name={cat.name}
							pattern={cat.pattern}
							pics={cat.pics}
							picCount={cat.picCount}
						/>
					) : (
						<ActivityIndicator />
					)
				) : (
					<View>
						<AppHeader title="Activity" />
						<CatTiles />
					</View>
				)}
			</Container>
		)
	}
}

HomeScreen.navigationOptions = {
	header: null
}

HomeScreen.propTypes = {
	cat: PropTypes.shape({
		description: PropTypes.string,
		homeless: PropTypes.bool,
		id: PropTypes.string,
		img: PropTypes.string,
		lastLocationTime: PropTypes.string,
		lat: PropTypes.string,
		lon: PropTypes.string,
		mealCount: PropTypes.number,
		meals: PropTypes.array,
		name: PropTypes.string,
		pattern: PropTypes.string,
		pics: PropTypes.array,
		picCount: PropTypes.number,
		region: PropTypes.object
	}),
	selected: PropTypes.bool
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
