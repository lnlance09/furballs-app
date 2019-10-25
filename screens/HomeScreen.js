import PropTypes from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchActivity } from "../actions/activity"
import {
	FlatList,
	Platform,
	ScrollView,
	StyleSheet,
	View
} from "react-native"
import { CatCard } from "../components/CatCard"

class HomeScreen extends Component {
	constructor(props) {
		super(props)
		
		this.state = {}
	}

	componentDidMount() {
		this.props.fetchActivity()
	}

	render() {
		const styles = StyleSheet.create({
			container: {
				backgroundColor: "#fff",
				flex: 1
			},
			contentContainer: {
				paddingTop: 0
			},
			getStartedContainer: {
				alignItems: "center",
				alignSelf: "stretch",
				marginHorizontal: 0,
				width: "100%"
			},
			getStartedText: {
				color: "rgba(96,100,109, 1)",
				fontSize: 17,
				lineHeight: 24,
				textAlign: "center"
			}
		})

		return (
			<View style={styles.container}>
				<ScrollView
					style={styles.container}
					contentContainerStyle={styles.contentContainer}
				>
					<View style={styles.getStartedContainer}>
						<FlatList
							data={this.props.cats}
							keyExtractor={item => item.id}
							renderItem={({ item }) => (
								<CatCard
									description={item.description}
									img={item.img}
									lat={item.lat}
									lon={item.lon}
									name={item.name}
								/>
							)}
							style={{ width: "100%" }}
						/>
					</View>
				</ScrollView>
			</View>
		)
	}
}

HomeScreen.propTypes = {
	cats: PropTypes.array,
	fetchActivity: PropTypes.func
}

HomeScreen.defaultProps = {
	cats: [],
	fetchActivity
}

const mapStateToProps = (state, ownProps) => {
	return {
		...state.activity,
		...ownProps
	}
}

export default connect(
	mapStateToProps,
	{
		fetchActivity
	}
)(HomeScreen)
