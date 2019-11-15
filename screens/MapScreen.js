import Animated, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import CatList from "../components/CatList"
import Colors from "../constants/Colors"
import PropTypes from "prop-types"
import mapStyle from "../mapStyle.json"
import React, { Component } from "react"
import { connect } from "react-redux"
import { style } from "./styles/MapScreen"
import { fetchActivity } from "@redux/actions/activity"
import { getCat, resetCat } from "@redux/actions/app"
import {
	searchCats,
	searchCatsByLocation,
	setRegion,
	toggleCatListRefeshing
} from "@redux/actions/map"
import _ from "lodash"
import { Tab, TabHeading, Tabs, Text } from "native-base"
import { SafeAreaView, StyleSheet, View } from "react-native"

const styles = StyleSheet.create(style)

class MapScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {
			index: 0,
			routes: [{ key: "list", title: "List" }, { key: "map", title: "Map" }]
		}

		this.onRegionChange = this.onRegionChange.bind(this)
	}

	componentDidMount() {
		this.props.searchCatsByLocation({
			lat: this.props.initialRegion.latitude,
			lon: this.props.initialRegion.longitude
		})
	}

	onRegionChange(region) {
		console.log("change region")
		console.log(region)
		// _.debounce(region => {
			this.props.setRegion(region)
			this.props.searchCatsByLocation({
				lat: region.latitude,
				lon: region.longitude
			})
		// }, 2000)
	}

	render() {
		const { initialRegion, mapCats } = this.props
		const { navigate } = this.props.navigation
		console.log("map screen")
		console.log(this.props.region)

		const MapView = () => (
			<View>
				<Animated
					customMapStyle={mapStyle}
					onRegionChangeComplete={this.onRegionChange}
					provider={PROVIDER_GOOGLE}
					initialRegion={initialRegion}
					style={styles.map}
				>
					{mapCats.map(c => {
						return (
							<Marker
								coordinate={{
									latitude: parseFloat(c.lat, 10),
									longitude: parseFloat(c.lon, 10)
								}}
								description={c.description}
								key={`MapMarker${c.id}`}
								onPress={() => {
									navigate("Cat", {
										id: c.id
									})
								}}
								title={c.name}
							/>
						)
					})}
				</Animated>
			</View>
		)

		const SearchView = () => <CatList navigate={navigate} />

		return (
			<SafeAreaView style={styles.container}>
				<Tabs
					tabContainerStyle={styles.tabBarContainerStyle}
					tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
				>
					<Tab
						heading={
							<TabHeading style={styles.tabHeading}>
								<Text style={styles.tabText}>List</Text>
							</TabHeading>
						}
					>
						{SearchView(this.props)}
					</Tab>
					<Tab
						heading={
							<TabHeading style={styles.tabHeading}>
								<Text style={styles.tabText}>Map</Text>
							</TabHeading>
						}
					>
						{MapView(this.props)}
					</Tab>
				</Tabs>
			</SafeAreaView>
		)
	}
}

MapScreen.navigationOptions = {
	header: null
}

MapScreen.propTypes = {
	cat: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
	refreshing: PropTypes.bool,
	fetchActivity: PropTypes.func,
	getCat: PropTypes.func,
	initialRegion: PropTypes.shape({
		latitude: PropTypes.number,
		latitudeDelta: PropTypes.number,
		longitude: PropTypes.number,
		longitudeDelta: PropTypes.number
	}),
	mapCats: PropTypes.array,
	navigation: PropTypes.object,
	region: PropTypes.shape({
		latitude: PropTypes.number,
		longitude: PropTypes.number
	}),
	resetCat: PropTypes.func,
	searchCats: PropTypes.func,
	searchCatsByLocation: PropTypes.func,
	setRegion: PropTypes.func,
	toggleCatListRefeshing: PropTypes.func
}

MapScreen.defaultProps = {
	cat: null,
	fetchActivity,
	getCat,
	initialRegion: {
		latitude: 40.7644,
		latitudeDelta: 0.0922,
		longitude: -73.9235,
		longitudeDelta: 0.0421
	},
	mapCats: [],
	refreshing: false,
	resetCat,
	searchCats,
	searchCatsByLocation,
	setRegion,
	toggleCatListRefeshing
}

const mapStateToProps = (state, ownProps) => {
	return {
		...state.app,
		...state.map,
		...ownProps
	}
}

export default connect(
	mapStateToProps,
	{
		fetchActivity,
		getCat,
		resetCat,
		searchCats,
		searchCatsByLocation,
		setRegion,
		toggleCatListRefeshing
	}
)(MapScreen)
