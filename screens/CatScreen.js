import * as constants from "@redux/types"
import Animated, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import mapStyle from "../mapStyle.json"
import AppHeader from "../components/AppHeader"
import ButtonComponent from "../components/ButtonComponent"
import Colors from "../constants/Colors"
import PropTypes from "prop-types"
import moment from "moment"
import store from "../store"
import React, { Component } from "react"
import { style } from "./styles/CatScreen"
import { connect } from "react-redux"
import { RenderMeal } from "../tools/textFunctions"
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
// import { faDrumstickBite } from "@fortawesome/free-solid-svg-icons"
import { TextField } from "react-native-material-textfield"
import { getCat, likeCat, resetCat, toggleCatScreenEditing, unlikeCat } from "@redux/actions/app"
import { Container, Tab, Tabs, TabHeading, Text, Toast } from "native-base"
import {
	ImageBackground,
	ScrollView,
	StyleSheet,
	View
} from "react-native"
import { Icon, Image, ListItem, Overlay } from "react-native-elements"
import { FlatGrid } from "react-native-super-grid"
import { LinearGradient } from "expo-linear-gradient"

const styles = StyleSheet.create(style)

class CatScreen extends Component {
	constructor(props) {
		super(props)

		console.log("cat screen mounted")

		this.state = {
			auth: false,
			bearer: null,
			explanation: "",
			reportLayoutVisible: false,
			user: null
		}

		this.likeCat = this.likeCat.bind(this)
		this.reportAbuse = this.reportAbuse.bind(this)
		this.unlikeCat = this.unlikeCat.bind(this)
	}

	async componentDidMount() {
		console.log("componentDidMount")
		const _state = store.getState()
		const user = _state.profile.user
		const auth = user === null ? false : true
		const bearer = auth ? user.token : null

		this.setState({ auth, bearer, user })

		const id = this.props.navigation.getParam("id", null)
		this.props.getCat({ bearer, id })
	}

	likeCat(bearer, id) {
		this.props.likeCat({ bearer, id })
	}

	reportAbuse() {
		const id = this.props.cat.id
		const { bearer, explanation } = this.state

		if (explanation.trim() !== "") {
			let headers = {
				Accept: "application/json",
				"Content-Type": "application/json"
			}

			if (bearer) {
				headers.Authorization = bearer
			}

			fetch(`${constants.BASE_URL}api/cats/reportAbuse`, {
				body: JSON.stringify({
					cat_id: id,
					explanation
				}),
				headers,
				method: "POST"
			})
				.then(response => response.json())
				.then(json => {
					if (!json.error) {
						Toast.show({
							buttonText: null,
							text: "Your report has been submitted!",
							type: "success"
						})
						this.setState({ reportLayoutVisible: false })
					}
				})
				.catch(error => {
					console.error(error)
				})
		}
	}

	unlikeCat(bearer, id) {
		this.props.unlikeCat({ bearer, id })
	}

	render() {
		const { auth, explanation, reportLayoutVisible, user } = this.state
		const { cat, loading } = this.props
		const {
			description,
			homeless,
			id,
			img,
			lastLocationTime,
			lat,
			likedByMe,
			lon,
			meals,
			mealCount,
			name,
			picCount,
			userId
		} = cat
		const { navigate } = this.props.navigation
		const canEdit = auth && userId === user.id

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

				<ButtonComponent
					buttonStyle={styles.feedBtn}
					onPress={() => navigate("Capture")}
					text="Add pics"
					textStyle={styles.feedBtnText}
				/>
				<ButtonComponent
					buttonStyle={styles.flagBtn}
					onPress={() =>  this.setState({ reportLayoutVisible: true })}
					text="Report cat abuse"
					textStyle={styles.flagBtnText}
				/>
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
										// this.props.resetCat()
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
								<LinearGradient
									colors={["transparent", "rgba(0,0,0,0.5)"]}
									style={styles.linearGradient}
								/>
								<Text style={styles.nameText}>{name}</Text>
								<Text style={styles.homelessText}>
									{homeless ? "Homeless cat" : "Bodega cat"}
								</Text>
							</ImageBackground>

							<Text style={styles.cardPageDescriptionText}>{description}</Text>

							{MapSection()}

							<Container style={styles.tabContainer}>
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

							<Overlay
								fullscreen
								isVisible={reportLayoutVisible}
								onBackdropPress={() =>
									this.setState({ reportLayoutVisible: false })
								}
							>
								<View>
									<Text style={styles.modalHeader}>
										Is this cat okay?
									</Text>
									<TextField
										characterRestriction={500}
										label="Suspect abuse or neglect?"
										multiline={true}
										numberOfLines={4}
										onChangeText={explanation => {
											this.setState({ explanation })
										}}
										sufffix="Let us know"
										style={
											{
												// height: 150,
												// justifyContent: "flex-start"
											}
										}
										inputContainerStyle={
											{
												// height: 130,
												// justifyContent: "flex-start"
											}
										}
										value={explanation}
									/>

									<ButtonComponent
										buttonStyle={styles.explanationBtn}
										onPress={() => this.reportAbuse()}
										text="Submit"
									/>
								</View>
							</Overlay>
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
		picCount: PropTypes.number,
		userId: PropTypes.number
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
