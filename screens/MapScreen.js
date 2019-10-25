import Animated, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchActivity } from "../actions/activity"
import {
	FlatList,
	ScrollView,
	StyleSheet,
	View
} from "react-native"
import { CatCard } from "../components/CatCard"

class MapScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {
			region: {
				latitude: 40.7644,
				latitudeDelta: 0.0922,
				longitude: -73.9235,
				longitudeDelta: 0.0421
			},
			selected: false,
			selectedId: null
		}
	}

	componentDidMount() {
		this.props.fetchActivity()
	}

	onRegionChange(region) {
		// this.setState({ region })
	}

	render() {
		const { region, selected, selectedId } = this.state

		const styles = StyleSheet.create({
			container: {
				backgroundColor: "#fff",
				flex: 1
			},
			map: {
				bottom: 0,
				height: 290,
				left: 0,
				position: "relative",
				right: 0,
				top: 0
			}
		})

		return (
			<View style={styles.container}>
				<Animated
					region={region}
					onRegionChange={this.onRegionChange}
					provider={PROVIDER_GOOGLE}
					style={styles.map}
				>
					{this.props.cats.map(c => {
						return (
							<Marker
								coordinate={{
									latitude: parseFloat(c.lat, 10),
									longitude: parseFloat(c.lon, 10)
								}}
								description={c.description}
								key={c.id}
								onPress={() => {
									console.log("clicked")
									this.setState({
										selected: true,
										selectedId: c.id
									})
								}}
								title={c.name}
							/>
						)
					})}
				</Animated>
				<ScrollView>
					<FlatList
						data={this.props.cats}
						keyExtractor={item => item.id}
						renderItem={({ item }) => {
							if ((selected && selectedId === item.id) || !selected) {
								return (
									<CatCard
										description={item.description}
										img={item.img}
										lat={item.lat}
										lon={item.lon}
										name={item.name}
									/>
								)
							}
						}}
						style={{ width: "100%" }}
					/>
				</ScrollView>
			</View>
		)
	}
}

MapScreen.navigationOptions = {
	title: "Furballs Near You"
}

MapScreen.propTypes = {
	cats: PropTypes.array,
	fetchActivity: PropTypes.func
}

MapScreen.defaultProps = {
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
)(MapScreen)
