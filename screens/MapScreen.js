import Animated, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import CatList from "../components/CatList"
import CatPage from "../components/CatPage"
import Colors from "../constants/Colors"
import PropTypes from "prop-types"
import mapStyle from "../mapStyle.json"
import React, { Component } from "react"
import { connect } from "react-redux"
import { style } from "./styles/MapScreen"
import { fetchActivity } from "@redux/actions/activity"
import { getCat, resetCat } from "@redux/actions/app"
import { searchCats, searchCatsByLocation, setRegion, toggleCatListRefeshing } from "@redux/actions/map"
import { Container, Tab, TabHeading, Tabs, Text } from "native-base"
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from "react-native"

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
		console.log("ssssss")
		console.log(this.props)
		this.props.searchCatsByLocation({
			lat: this.props.region.latitude,
			lon: this.props.region.longitude
		})
	}

	onRegionChange(region) {
		console.log("change region")
		console.log(region)
		this.props.setRegion(region)
	}

	render() {
		const {
			cat,
			mapCats,
			region,
			selected
		} = this.props
		console.log("map screen")
		console.log(this.props)

		const MapView = () => (
			<View>
				<Animated
					customMapStyle={mapStyle}
					// onRegionChange={this.onRegionChange}
					provider={PROVIDER_GOOGLE}
					region={region}
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
									this.props.getCat({ id: c.id })
								}}
								title={c.name}
							/>
						)
					})}
				</Animated>
			</View>
		)

		const SearchView = () => (
			<View>
				<CatList />
			</View>
		)

		return (
			<Container style={styles.container}>
				{selected ? (
					cat ? (
						<CatPage
							description={cat.description}
							homeless={cat.homeless}
							img={cat.img}
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
					<SafeAreaView style={{ flex: 1 }}>
						<Container>
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
						</Container>
					</SafeAreaView>
				)}
			</Container>
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
	mapCats: PropTypes.array,
	region: PropTypes.object,
	resetCat: PropTypes.func,
	searchCats: PropTypes.func,
	searchCatsByLocation: PropTypes.func,
	selected: PropTypes.bool,
	setRegion: PropTypes.func,
	toggleCatListRefeshing: PropTypes.func
}

MapScreen.defaultProps = {
	cat: null,
	fetchActivity,
	getCat,
	mapCats: [],
	refreshing: false,
	region: {
		latitude: 40.7644,
		latitudeDelta: 0.0922,
		longitude: -73.9235,
		longitudeDelta: 0.0421
	},
	resetCat,
	searchCats,
	searchCatsByLocation,
	selected: false,
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
