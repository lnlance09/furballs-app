import Animated, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import mapStyle from "../mapStyle.json"
import AppHeader from "../components/AppHeader"
import Colors from "../constants/Colors"
import PropTypes from "prop-types"
import React, { Component } from "react"
import moment from "moment"
import { style } from "./styles/CatScreen"
import { connect } from "react-redux"
import { RenderMeal } from "../tools/textFunctions"
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
// import { faDrumstickBite } from "@fortawesome/free-solid-svg-icons"
import { getItemFromStorage } from "../tools/storageFunctions"
import { getCat, likeCat, resetCat, toggleCatScreenEditing, unlikeCat } from "@redux/actions/app"
import { Button, Container, Tab, Tabs, TabHeading, Text } from "native-base"
import { AsyncStorage, ImageBackground, ScrollView, StyleSheet, View } from "react-native"
import { Icon, Image, ListItem } from "react-native-elements"
import { FlatGrid } from "react-native-super-grid"

const styles = StyleSheet.create(style)

class CatScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {
			auth: false,
			bearer: null,
			reportLayoutVisible: false,
			user: null
		}

		this.feedCat = this.feedCat.bind(this)
		this.likeCat = this.likeCat.bind(this)
		this.reportAbuse = this.reportAbuse.bind(this)
		this.unlikeCat = this.unlikeCat.bind(this)
	}

	async componentDidMount() {
		let user = await AsyncStorage.getItem("user") || null
		let auth = false
		let bearer = null
		if (user) {
			user = JSON.parse(user)
			auth = true
			bearer = user.token
		}

		console.log("user")
		console.log(user)
		this.setState({ auth, bearer, user })

		const id = this.props.navigation.getParam("id", null)
		this.props.getCat({ bearer, id })
	}

	feedCat(bearer) {
		// console.log("feed cat")
		this.setState({ reportLayoutVisible: true })
	}

	likeCat(bearer, id) {
		this.props.likeCat({ bearer, id })
	}

	reportAbuse() {}

	unlikeCat(bearer, id) {
		this.props.unlikeCat({ bearer, id })
	}

	render() {
		const { auth, reportLayoutVisible, user } = this.state
		const { cat, loading } = this.props
		const {
			description,
			id,
			img,
			lastLocationTime,
			lat,
			likedByMe,
			lon,
			meals,
			mealCount,
			name,
			picCount
		} = cat
		const { navigate } = this.props.navigation

		console.log("Cat screen")
		console.log(cat)

		const canEdit = true

		const MapSection = () => (
			<View>
				<Animated
					customMapStyle={mapStyle}
					provider={PROVIDER_GOOGLE}
					region={{
						latitude: lat,
						latitudeDelta: 0.013,
						longitude: lon,
						longitudeDelta: 0.013
					}}
					style={styles.map}
				>
					<Marker
						coordinate={{
							latitude: parseFloat(lat, 10),
							longitude: parseFloat(lon, 10)
						}}
					/>
				</Animated>
				<Text style={styles.spottedAtText}>
					🐾 Spotted {moment(lastLocationTime).fromNow()}
				</Text>
				<Text style={styles.spottedAtText}>🚩 Report animal abuse</Text>
				<Button
					block
					color={Colors.red}
					onPress={() => navigate("Capture")}
					style={styles.feedBtn}
				>
					<Icon color={Colors.white} name="photo" />
					<Text style={{ fontWeight: "bold" }}>Feed me</Text>
				</Button>
			</View>
		)

		const RenderMeals = () => {
			return meals.map((m, i) => (
				<ListItem
					bottomDivider
					key={`mealListItem${i}`}
					subtitle={`${RenderMeal([m.meal_type])}  ${moment(lastLocationTime).fromNow()}`}
					title={null}
				/>
			))
		}

		const RenderPhotos = props => {
			return (
				<FlatGrid
					itemDimension={130}
					items={props.pics}
					renderItem={({ item }) => <Image source={{ uri: item.pic_path }} />}
					style={styles.gridView}
				/>
			)
		}

		return (
			<Container style={styles.cardPageContainer}>
				{loading ? (
					<View></View>
				) : (
					<View>
						<AppHeader
							left={() => (
								<Icon
									color={Colors.black}
									name="arrow-back"
									onPress={() => {
										this.props.resetCat()
										this.props.navigation.goBack()
									}}
								/>
							)}
							right={() => (
								<Icon
									color={likedByMe ? Colors.pink : Colors.blue}
									name="heart"
									onPress={() => {
										if (likedByMe) {
											this.unlikeCat(user.token, id)
										} else {
											this.likeCat(user.token, id)
										}
									}}
									type="font-awesome"
								/>
							)}
							title={name}
						/>

						<ScrollView>
							<ImageBackground source={{ uri: img }} style={styles.cardPageImg}>
								<Text style={styles.nameText}>{name}</Text>
							</ImageBackground>

							<Text style={styles.cardPageDescriptionText}>{description}</Text>

							{MapSection()}

							<Container style={{ marginHorizontal: 7 }}>
								<Tabs
									tabContainerStyle={styles.tabBarContainerStyle}
									tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
								>
									<Tab
										heading={
											<TabHeading style={styles.tabHeading}>
												<Text style={styles.tabText}>Pics</Text>
											</TabHeading>
										}
									>
										{picCount > 0 ? (
											RenderPhotos(this.props)
										) : (
											<Text style={styles.emptyMsg}>
												This cat does not have any pics yet
											</Text>
										)}
									</Tab>
									<Tab
										heading={
											<TabHeading style={styles.tabHeading}>
												<Text style={styles.tabText}>Meals</Text>
											</TabHeading>
										}
									>
										{mealCount > 0 ? (
											RenderMeals()
										) : (
											<Text style={styles.emptyMsg}>
												This cat has not been fed yet
											</Text>
										)}
									</Tab>
								</Tabs>
							</Container>
						</ScrollView>
					</View>
				)}
			</Container>
		)
	}
}

CatScreen.navigationOptions = { header: null }

CatScreen.propTypes = {
	cat: PropTypes.shape({
		description: PropTypes.string,
		homeless: PropTypes.bool,
		id: PropTypes.string,
		img: PropTypes.string,
		lastLocationTime: PropTypes.string,
		lat: PropTypes.number,
		likeCount: PropTypes.number,
		likedByMe: PropTypes.bool,
		lon: PropTypes.number,
		mealCount: PropTypes.number,
		meals: PropTypes.array,
		name: PropTypes.string,
		pattern: PropTypes.string,
		pics: PropTypes.array,
		picCount: PropTypes.number
	}),
	editing: PropTypes.bool,
	getCat: PropTypes.func,
	likeCat: PropTypes.func,
	loading: PropTypes.bool,
	navigation: PropTypes.object,
	region: PropTypes.shape({
		latitude: PropTypes.number,
		latitudeDelta: PropTypes.number,
		longitude: PropTypes.number,
		longitudeDelta: PropTypes.number
	}),
	resetCat: PropTypes.func,
	toggleCatScreenEditing: PropTypes.func,
	unlikeCat: PropTypes.func
}

CatScreen.defaultProps = {
	cat: {
		id: null,
		likedByMe: false
	},
	editing: false,
	getCat,
	likeCat,
	loading: true,
	region: {
		latitude: 40.7644,
		latitudeDelta: 0.0922,
		longitude: -73.9235,
		longitudeDelta: 0.0421
	},
	resetCat,
	toggleCatScreenEditing,
	unlikeCat
}

const mapStateToProps = (state, ownProps) => {
	return {
		...state.app,
		...state.profile,
		...ownProps
	}
}

export default connect(
	mapStateToProps,
	{
		getCat,
		likeCat,
		resetCat,
		toggleCatScreenEditing,
		unlikeCat
	}
)(CatScreen)
