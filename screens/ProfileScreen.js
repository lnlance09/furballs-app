import * as Permissions from "expo-permissions"
import AppHeader from "@components/primary/AppHeader"
import CatGrid from "@components/secondary/CatGrid"
import Colors from "@constants/Colors"
import PropTypes from "prop-types"
import store from "@store"
import React, { Component } from "react"
import { connect } from "react-redux"
import { style } from "./styles/ProfileScreen"
import { fetchUser, logout } from "@redux/actions/user"
import {
	ScrollView,
	StyleSheet,
	View
} from "react-native"
import { Container, Text } from "native-base"
import { Avatar, Icon, ListItem } from "react-native-elements"

const styles = StyleSheet.create(style)

class ProfileScreen extends Component {
	constructor(props) {
		super(props)

		const { navigate } = this.props.navigation
		this.navigate = navigate

		this.state = {
			auth: false,
			bearer: null,
			hasCameraPermission: false,
			settingsVisible: false,
			verified: false
		}
	}

	async componentDidMount() {
		this.checkUser()

		this.willFocusProfileScreen = this.props.navigation.addListener(
			"willFocus",
			() => {
				this.checkUser()
			}
		)
	}

	componentWillUnmount() {
		this.willFocusProfileScreen.remove()
	}

	checkUser() {
		const _state = store.getState()
		const user = _state.user.user
		const bearer = _state.user.token
		const verified = user.email_verified
		const auth = bearer === null ? false : true
		this.setState({ auth, bearer, verified })

		console.log("componentDidMount profile screen")
		console.log(_state)

		if (!auth) {
			this.navigate("Login")
			return
		}

		if (!verified) {
			this.navigate("VerificationCode")
			return
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

	toggleSettingsVisibility() {
		console.log("toggleSettingsVisibility")
		this.setState({ settingsVisible: !this.state.settingsVisible })
	}

	render() {
		console.log("profile screen props")
		console.log(this.props.user)
		console.log("profile screen state")
		console.log(this.state)

		const {
			auth,
			hasCameraPermission,
			settingsVisible,
			verified
		} = this.state
		const { navigation, user } = this.props
		const { navigate } = navigation

		const SettingsSection = (
			<View>
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
				{auth && verified ? (
					<View>
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

						{settingsVisible ? (
							SettingsSection
						) : (
							<ScrollView>
								<View style={styles.imageWrapper}>
									<Avatar
										icon={{ name: "home" }}
										onEditPress={() => {
											navigate("CameraRoll")
										}}
										rounded
										showEditButton
										size="large"
									/>
								</View>
								<Text style={styles.h1}>{user.name}</Text>
								<Text style={styles.usernameText}>@{user.username}</Text>

								<View style={{ marginTop: 12 }}>
									<CatGrid navigation={navigation} user={user} />
								</View>
							</ScrollView>
						)}
					</View>
				) : null}
			</Container>
		)
	}
}

ProfileScreen.navigationOptions = {
	header: null
}

ProfileScreen.propTypes = {
	fetchUser: PropTypes.func,
	logout: PropTypes.func,
	navigation: PropTypes.object,
	user: PropTypes.shape({
		email: PropTypes.string,
		email_verified: PropTypes.bool,
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		img: PropTypes.string,
		name: PropTypes.string,
		username: PropTypes.string,
		uuid: PropTypes.string
	})
}

ProfileScreen.defaultProps = {
	fetchUser,
	logout,
	user: {
		email: null,
		email_verified: true,
		id: null,
		img: null,
		name: null,
		username: null,
		uuid: null
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		...state.user,
		...ownProps
	}
}

export default connect(
	mapStateToProps,
	{
		fetchUser,
		logout
	}
)(ProfileScreen)