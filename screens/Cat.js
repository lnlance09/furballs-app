import * as constants from "@redux/types"
import { style } from "./styles/Cat"
import { connect } from "react-redux"
import { getCat, likeCat, resetCat, toggleCatScreenEditing, unlikeCat } from "@redux/actions/cat"
import { playSound } from "@tools/soundFunctions"
import { RenderMeal } from "@tools/textFunctions"
import { TextField } from "react-native-material-textfield"
import { Container, Spinner, Toast } from "native-base"
import { Clipboard, Dimensions, Image, ScrollView, StyleSheet, View } from "react-native"
import { Icon, ListItem, Overlay } from "react-native-elements"
import Animated, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import CatMeow from "../assets/sounds/cat-meow.mp3"
import CatPic from "@assets/images/family-cat-illustration-band.png"
import AppHeader from "@components/primary/AppHeader"
import Button from "@components/primary/Button"
import Carousel from "@components/primary/Carousel"
import Colors from "@constants/Colors"
import mapStyle from "../mapStyle.json"
import moment from "moment"
import PropTypes from "prop-types"
import React, { Component } from "react"
import SlidingUpPanel from "rn-sliding-up-panel"
import store from "@store"
import StyledText from "@components/primary/StyledText"

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
	}

	async componentDidMount() {
		this.willFocusCatPage = this.props.navigation.addListener("willFocus", async () => {
			const _state = store.getState()
			const user = _state.user
			const auth = user.token === null ? false : true
			const bearer = auth ? user.token : null
			this.setState({ auth, bearer, user })

			const id = this.props.navigation.getParam("id", null)
			console.log("getCat")
			console.log(id)
			await this.props.getCat({ id })
			this._panel.hide()
		})
	}

	componentWillUnmount() {
		this.willFocusCatPage.remove()
	}

	likeCat = async (bearer, id) => {
		playSound(CatMeow)
		this.props.likeCat({ bearer, id })
	}

	reportAbuse = () => {
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

	setContent = id => {
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

	unlikeCat = (bearer, id) => {
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

		console.log("cat screen")
		console.log(this.props)

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
				<StyledText
					style={styles.spottedAtText}
					text={`🐾 Spotted ${moment(lastLocationTime).fromNow()}`}
				/>
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
								// borderColor: imgColor
							}}
							navigation={this.props.navigation}
							photos={this.props.cat.pics}
							width={width}
						/>

						<ScrollView style={{ marginHorizontal: 7, marginVertical: 0 }}>
							<StyledText
								style={styles.nameText}
								text={name}
							/>
							<StyledText
								style={styles.homelessText}
								text={livingSituationLabel}
							/>
							<StyledText
								style={styles.cardPageDescriptionText}
								text={description}
							/>

							{MapSection()}

							<StyledText
								style={styles.cardPageDescriptionText}
								text="Cativity"
							/>

							{mealCount > 0 ? (
								RenderMeals()
							) : (
								<StyledText
									style={styles.emptyMsg}
									text="This cat has not been fed yet"
								/>
							)}

							<Overlay
								fullscreen
								isVisible={reportLayoutVisible}
								onBackdropPress={() =>
									this.setState({ reportLayoutVisible: false })
								}
							>
								<View>
									<StyledText
										style={styles.modalHeader}
										text="Report animal abuse"
									/>
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
									<Button
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
		...state.cat,
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