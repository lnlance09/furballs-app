import CatList from "@components/secondary/CatList"
import Colors from "@constants/Colors"
import PropTypes from "prop-types"
import mapStyle from "../mapStyle.json"
import Animated, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import React, { Component } from "react"
import { connect } from "react-redux"
import { style } from "./styles/MapScreen"
import { searchCatsByLocation, setRegion } from "@redux/actions/cat"
import { Tab, TabHeading, Tabs, Text } from "native-base"
import { SafeAreaView, StyleSheet, View } from "react-native"

const styles = StyleSheet.create(style)

class MapScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {
			index: 0,
			routes: [{ key: "map", title: "Map" }, { key: "list", title: "List" }]
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
		this.props.setRegion(region)
		this.props.searchCatsByLocation({
			lat: region.latitude,
			lon: region.longitude
		})
	}

	render() {
		const { initialRegion, mapCats } = this.props
		const { navigate } = this.props.navigation

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
						let pinColor = Colors.strayCat
						if (parseInt(c.living_situation, 10) === 1) {
							pinColor = Colors.businessCat
						}
						if (parseInt(c.living_situation, 10) === 2) {
							pinColor = Colors.familyCat
						}

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
								pinColor={pinColor}
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
								<Text style={styles.tabText}>Map</Text>
							</TabHeading>
						}
					>
						{MapView(this.props)}
					</Tab>
					<Tab
						heading={
							<TabHeading style={styles.tabHeading}>
								<Text style={styles.tabText}>List</Text>
							</TabHeading>
						}
					>
						{SearchView(this.props)}
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
	searchCatsByLocation: PropTypes.func,
	setRegion: PropTypes.func
}

MapScreen.defaultProps = {
	cat: null,
	initialRegion: {
		latitude: 40.7644,
		latitudeDelta: 0.0922,
		longitude: -73.9235,
		longitudeDelta: 0.0421
	},
	mapCats: [],
	searchCatsByLocation,
	setRegion
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
		searchCatsByLocation,
		setRegion
	}
)(MapScreen)
