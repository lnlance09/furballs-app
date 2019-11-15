import * as Permissions from "expo-permissions"
import AppHeader from "../components/AppHeader"
import CatGrid from "../components/CatGrid"
import Colors from "../constants/Colors"
import PropTypes from "prop-types"
import ToggleSwitch from "toggle-switch-react-native"
import store from "../store/"
import React, { Component } from "react"
import { connect } from "react-redux"
import { style } from "./styles/ProfileScreen"
import {
	fetchUser,
	getCurrentUser,
	logout
} from "@redux/actions/profile"
import {
	ActivityIndicator,
	AsyncStorage,
	CameraRoll,
	Image,
	ScrollView,
	StyleSheet,
	Switch,
	View
} from "react-native"
import { Container, Tab, TabHeading, Tabs, Text } from "native-base"
import { Avatar, Icon, ListItem } from "react-native-elements"

const styles = StyleSheet.create(style)

class ProfileScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {
			auth: false,
			hasCameraPermission: false,
			hasCameraRollPermission: false,
			hasLocationPermission: false,
			hasMicrophonePermission: false,
			hasPushNotifications: false,
			photos: [],
			settingsVisible: false,
		}
	}

	async componentDidMount() {
		let user = await AsyncStorage.getItem("user") || null
		if (user) {
			user = JSON.parse(user)
			this.setState({ auth: true })
			this.props.fetchUser({ id: user.id })

			this.toggleCameraPermission(true)
			this.toggleCameraRollPermission(true)
			this.toggleLocationPermission(true)
			this.toggleMicrophonePermission(true)
		} else {
			const { navigate } = this.props.navigation
			navigate("Login")
		}
	}

	async toggleCameraPermission(on) {
		if (on) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA)
			this.setState({
				hasCameraPermission: status === "granted"
			})
		} else {
			this.setState({ hasCameraPermission: false })
		}
	}

	async toggleCameraRollPermission(on) {
		if (on) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
			this.setState({
				hasCameraRollPermission: status === "granted"
			})
		} else {
			this.setState({ hasCameraRollPermission: false })
		}
	}

	async toggleLocationPermission(on) {
		if (on) {
			const { status } = await Permissions.askAsync(Permissions.LOCATION)
			this.setState({
				hasLocationPermission: status === "granted"
			})
		} else {
			this.setState({ hasLocationPermission: false })
		}
	}

	async toggleMicrophonePermission(on) {
		if (on) {
			const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
			this.setState({
				hasMicrophonePermission: status === "granted"
			})
		} else {
			this.setState({ hasMicrophonePermission: false })
		}
	}

	async togglePushNotifications(on) {
		console.log('togglePushNotifications')
		console.log(on)
		if (on) {
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
			console.log("status")
			console.log(status)
			this.setState({
				hasPushNotifications: status === "granted"
			})
		} else {
			this.setState({ hasPushNotifications: false })
		}
	}

	toggleSettingsVisibility() {
		this.setState({ settingsVisible: !this.state.settingsVisible })
	}

	render() {
		const {
			auth,
			hasCameraPermission,
			hasCameraRollPermission,
			hasLocationPermission,
			hasMicrophonePermission,
			hasPushNotifications,
			photos,
			settingsVisible
		} = this.state
		const { user } = this.props
		const { navigate } = this.props.navigation

		console.log("photos")
		console.log(photos)

		const RenderCameraRoll = (
			photos.map((p, i) => (
				<Image
					key={i}
					source={{ uri: p.node.image.uri }}
					style={{
						width: 300,
						height: 100
					}}
				/>
			))
		)

		const SettingsSection = (
			<View>
				<ListItem
					bottomDivider
					key="pushNotificationsListItem"
					rightTitle={(
						<ToggleSwitch
							isOn={hasPushNotifications}
							onColor={Colors.green}
							onToggle={isOn => this.togglePushNotifications(isOn)}
						/>
					)}
					subtitle={null}
					title="Push notifications"
				/>
				<ListItem
					bottomDivider
					key="locationListItem"
					rightTitle={(
						<ToggleSwitch
							isOn={hasLocationPermission}
							onColor={Colors.green}
							onToggle={isOn => this.toggleLocationPermission(isOn)}
						/>
					)}
					subtitle={null}
					title="Location"
				/>
				<ListItem
					bottomDivider
					key="cameraListItem"
					rightTitle={(
						<ToggleSwitch
							isOn={hasCameraPermission}
							onColor={Colors.green}
							onToggle={isOn => this.toggleCameraPermission(isOn)}
						/>
					)}
					subtitle={null}
					title="Camera"
				/>
				<ListItem
					bottomDivider
					key="cameraRollListItem"
					rightTitle={(
						<ToggleSwitch
							isOn={hasCameraRollPermission}
							onColor={Colors.green}
							onToggle={isOn => this.toggleCameraRollPermission(isOn)}
						/>
					)}
					subtitle={null}
					title="Camera roll"
				/>
				<ListItem
					bottomDivider
					key="microphoneListItem"
					rightTitle={(
						<ToggleSwitch
							isOn={hasMicrophonePermission}
							onColor={Colors.green}
							onToggle={isOn => this.toggleMicrophonePermission(isOn)}
						/>
					)}
					subtitle={null}
					title="Microphone"
				/>
				{auth !== null && (
					<ListItem
						bottomDivider
						key="logoutListItem"
						onPress={() => {
							this.props.logout()
							navigate("Login")
						}}
						subtitle={null}
						title="Logout"
					/>
				)}
			</View>
		)

		return (
			<Container>
				<AppHeader
					left={() => null}
					right={() => (
						<Icon
							color={Colors.black}
							name="cog"
							onPress={() => this.toggleSettingsVisibility()}
							type="font-awesome"
						/>
					)}
					title="Profile"
				/>
				<ScrollView>
					{settingsVisible ? (
						SettingsSection
					) : user.id ? (
						<View>
							<View style={styles.imageWrapper}>
								<Avatar
									icon={{ name: "home" }}
									onEditPress={() => {
										CameraRoll.getPhotos({
											assetType: "Photos",
											first: 20
										})
										.then(r => {
											console.log("edges")
											console.log(r)
											this.setState({ photos: r.edges });
										})
										.catch((err) => {
											// Error Loading Images
										})
									}}
									rounded
									showEditButton
									size="large"
								/>
								{RenderCameraRoll}
							</View>
							<Text style={styles.h1}>{user.name}</Text>
							<Text style={styles.usernameText}>@{user.username}</Text>

							<Container style={{ marginLeft: 4, marginRight: 7 }}>
								<Text style={{ fontSize: 24, marginLeft: 7, marginTop: 8 }}>My cats</Text>
								<CatGrid navigate={navigate} user={user} />
							</Container>
						</View>
					) : (
						<ActivityIndicator />
					)}
				</ScrollView>
			</Container>
		)
	}
}

ProfileScreen.navigationOptions = {
	header: null
}

ProfileScreen.propTypes = {
	authenticated: PropTypes.bool,
	catCount: PropTypes.number,
	catImages: PropTypes.array,
	cats: PropTypes.array,
	fetchUser: PropTypes.func,
	getCurrentUser: PropTypes.func,
	logout: PropTypes.func,
	navigation: PropTypes.object,
	user: PropTypes.shape({
		dateCreated: PropTypes.string,
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		img: PropTypes.string,
		name: PropTypes.string,
		pushNotificationsEnabled: PropTypes.bool,
		verificationCode: PropTypes.string
	}),
}

ProfileScreen.defaultProps = {
	fetchUser,
	getCurrentUser,
	logout,
	user: {
		dateCreated: null,
		id: null,
		img: null,
		name: null,
		pushNotificationsEnabled: true,
		verificationCode: null
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		...state.profile,
		...ownProps
	}
}

export default connect(
	mapStateToProps,
	{
		fetchUser,
		getCurrentUser,
		logout
	}
)(ProfileScreen)
