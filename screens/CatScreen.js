import * as constants from "@redux/types"
import Animated, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import CatPic from "@assets/images/family-cat-illustration-band.png"
import mapStyle from "../mapStyle.json"
import AppHeader from "@components/primary/AppHeader"
import ButtonComponent from "@components/primary/ButtonComponent"
import Carousel from "@components/primary/Carousel"
import Colors from "@constants/Colors"
import PropTypes from "prop-types"
import moment from "moment"
import store from "@store"
import SlidingUpPanel from "rn-sliding-up-panel"
import React, { Component } from "react"
import { playSound } from "@tools/soundFunctions"
import { RenderMeal } from "@tools/textFunctions"
import { style } from "./styles/CatScreen"
import { connect } from "react-redux"
import { TextField } from "react-native-material-textfield"
import { getCat, likeCat, resetCat, toggleCatScreenEditing, unlikeCat } from "@redux/actions/cat"
import { Container, Spinner, Text, Toast } from "native-base"
import { Clipboard, Dimensions, Image, ScrollView, StyleSheet, View } from "react-native"
import { Icon, ListItem, Overlay } from "react-native-elements"
import CatMeow from "../assets/sounds/cat-meow.mp3"

const styles = StyleSheet.create(style)

const { height, width } = Dimensions.get("window")
const sliderHeight = 240

class CatScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {
			auth: false,
			bearer: null,
			explanation: "",
			reportLayoutVisible: false,
			user: {}
		}

		this.likeCat = this.likeCat.bind(this)
		this.reportAbuse = this.reportAbuse.bind(this)
		this.unlikeCat = this.unlikeCat.bind(this)
	}

	async componentDidMount() {
		this.willFocusCatPage = this.props.navigation.addListener("willFocus", () => {
			const _state = store.getState()
			const user = _state.user
			const auth = user.token === null ? false : true
			const bearer = auth ? user.token : null
			this.setState({ auth, bearer, user })

			const id = this.props.navigation.getParam("id", null)
			this.props.getCat({ bearer, id })
			this._panel.hide()
		})
	}

	componentWillUnmount() {
		this.willFocusCatPage.remove()
	}

	async likeCat(bearer, id) {
		playSound(CatMeow)
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
							style: {
								backgroundColor: "#f0f0f0",
								bottom: 64
							},
							text: "Your report has been submitted!",
							textStyle: {
								color: Colors.black,
								textAlign: "center"
							},
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

	setContent(id) {
		Clipboard.setString(`https://felinus.io/cats/${id}`)
		Toast.show({
			buttonText: null,
			style: {
				backgroundColor: "#f0f0f0",
				bottom: 64
			},
			text: "Link copied!",
			textStyle: {
				color: Colors.black,
				textAlign: "center"
			},
			type: "success"
		})
	}

	unlikeCat(bearer, id) {
		this.props.unlikeCat({ bearer, id })
	}

	render() {
		const { auth, bearer, explanation, reportLayoutVisible, user } = this.state
		const { cat, loading } = this.props
		const {
			description,
			id,
			imgColor,
			lastLocationTime,
			lat,
			likedByMe,
			livingSituation,
			livingSituationLabel,
			lon,
			meals,
			mealCount,
			name,
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
			</View>
		)
		const RenderMeals = () => {
			return meals.map((m, i) => (
				<ListItem
					bottomDivider
					containerStyle={{
						paddingLeft: 0
					}}
					key={`mealListItem${i}`}
					subtitle={`${RenderMeal([m.meal_type])}  ${moment(lastLocationTime).fromNow()}`}
					title={null}
				/>
			))
		}
		const SlidePanel = (
			<SlidingUpPanel height={height} ref={c => (this._panel = c)}>
				<View style={styles.slideUpPanel}>
					<Image resizeMode="cover" source={CatPic} style={{ width, height: 400 }} />
					<ListItem
						bottomDivider
						containerStyle={{ width }}
						key="camera-action"
						leftIcon={{ color: Colors.yellow, name: "camera", type: "font-awesome" }}
						onPress={() =>
							navigate("Capture", {
								showHeader: true
							})
						}
						title="Capture"
					/>
					<ListItem
						bottomDivider
						containerStyle={{ width }}
						key="like-action"
						leftIcon={{ color: Colors.pink, name: "heart", type: "font-awesome" }}
						onPress={() => {
							if (likedByMe) {
								this.unlikeCat(bearer, id)
							} else {
								this.likeCat(bearer, id)
							}
							this._panel.hide()
						}}
						title={likedByMe ? "Loved!" : "Love"}
					/>
					<ListItem
						bottomDivider
						containerStyle={{ width }}
						key="report-action"
						leftIcon={{ color: Colors.red, name: "flag" }}
						onPress={() => this.setState({ reportLayoutVisible: true })}
						title="Report animal abuse"
					/>
					<ListItem
						bottomDivider
						containerStyle={{ width }}
						key="link-action"
						leftIcon={{ color: Colors.blue, name: "link" }}
						onPress={() => this.setContent(id)}
						title="Copy URL"
					/>
					<ListItem
						bottomDivider
						containerStyle={{ width }}
						key="close-action"
						leftIcon={{ color: Colors.black, name: "close" }}
						onPress={() => {
							this._panel.hide()
						}}
						title="Close"
					/>
				</View>
			</SlidingUpPanel>
		)
		return (
			<Container style={styles.cardPageContainer}>
				{loading ? null : (
					<View>
						<AppHeader
							left={() => (
								<Icon
									color={Colors.black}
									name="arrow-back"
									onPress={() => {
										this.props.navigation.goBack()
										this.props.resetCat()
									}}
								/>
							)}
							right={() => (
								<Icon
									color={Colors.black}
									name="kebab-horizontal"
									onPress={() => {
										this._panel.show()
									}}
									type="octicon"
								/>
							)}
							title={name}
						/>

						<Carousel
							imgColor={{
								borderColor: imgColor
							}}
							navigation={this.props.navigation}
							photos={this.props.cat.pics}
							width={width}
						/>

						<ScrollView style={{ marginHorizontal: 7, marginVertical: 7 }}>
							<Text style={styles.nameText}>{name}</Text>
							<Text style={styles.homelessText}>{livingSituationLabel}</Text>
							<Text style={styles.cardPageDescriptionText}>{description}</Text>

							{MapSection()}

							<Text style={{ fontSize: 24, marginBottom: 5, marginTop: 18 }}>
								Cativity
							</Text>
							{mealCount > 0 ? (
								RenderMeals()
							) : (
								<Text style={styles.emptyMsg}>This cat has not been fed yet</Text>
							)}

							<Overlay
								fullscreen
								isVisible={reportLayoutVisible}
								onBackdropPress={() =>
									this.setState({ reportLayoutVisible: false })
								}
							>
								<View>
									<Text style={styles.modalHeader}>Report animal abuse</Text>
									<TextField
										characterRestriction={500}
										label="Suspect abuse or neglect?"
										multiline={true}
										numberOfLines={4}
										onChangeText={explanation => {
											this.setState({ explanation })
										}}
										sufffix="Let us know"
										value={explanation}
									/>
									<ButtonComponent
										buttonStyle={styles.explanationBtn}
										onPress={() => this.reportAbuse()}
										text="Report"
									/>
								</View>
							</Overlay>
						</ScrollView>
					</View>
				)}
				{SlidePanel}
			</Container>
		)
	}
}
CatScreen.navigationOptions = { header: null }
CatScreen.propTypes = {
	cat: PropTypes.shape({
		description: PropTypes.string,
		id: PropTypes.string,
		imgColor: PropTypes.string,
		lastLocationTime: PropTypes.string,
		lat: PropTypes.number,
		likeCount: PropTypes.number,
		likedByMe: PropTypes.bool,
		livingSituation: PropTypes.number,
		livingSituationLabel: PropTypes.string,
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