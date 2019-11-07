import AppHeader from "../components/AppHeader"
import CatGrid from "../components/CatGrid"
import Colors from "../constants/Colors"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"
import { style } from "./styles/ProfileScreen"
import { fetchUser, getCurrentUser, login, logout, register, resetPassword, setUserId } from "@redux/actions/profile"
import {
	ActivityIndicator,
	AsyncStorage,
	Dimensions,
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableHighlight,
	View
} from "react-native"
import { Container, Text, Toast } from "native-base"
import { Avatar, Button, Icon, Image, ListItem } from "react-native-elements"

const width = Dimensions.get("window").width - 20

const styles = StyleSheet.create(style)

class ProfileScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: "",
			forgotPassword: false,
			imgIndex: 0,
			loginForm: true,
			modalVisible: false,
			name: "",
			password: "",
			registrationForm: false,
			settingsVisible: false,
			showToast: false,
			username: ""
		}
	}

	async componentDidMount() {
		let userId = ""
		try {
			userId = (await AsyncStorage.getItem("userId")) || null
		} catch (error) {
			console.log(error.message)
		}

		if (userId) {
			this.props.fetchUser({ id: userId })
		}
	}

	resetPassword() {
		if (email !== "") {
			this.props.resetPassword({ email, password })
		}
	}

	submitLoginForm(email, password) {
		if (email !== "" && password !== "") {
			this.props.login({ email, password })
		}
	}

	submitRegistrationForm(email, name, password, username) {
		if (email === "") {
			Toast.show({
				buttonText: "Okay",
				duration: 3000,
				text: "Please enter a valid email address",
				type: "danger"
			})
		}

		if (password.length < 7) {
			Toast.show({
				buttonText: "Okay",
				duration: 3000,
				text: "You must enter your password",
				type: "danger"
			})
		}

		if (email !== "" && password.length > 6 && name.length > 1 && username.length > 1) {
			this.props.register({ email, name, password, username })
		}
	}

	toggleSettingsVisibility = () => this.setState({ settingsVisible: !this.state.settingsVisible })

	render() {
		const {
			email,
			forgotPassword,
			imgIndex,
			loginForm,
			modalVisible,
			name,
			password,
			registrationForm,
			settingsVisible,
			username
		} = this.state

		const { catImages, cats, catCount, user, userId } = this.props
		console.log("profile screen")
		console.log(this.props)
		console.log(imgIndex)

		const SubmitFormButton = ({ callback, text }) => {
			return <Button onPress={() => callback()} style={styles.formSubmitBtn} title={text} />
		}

		const ForgotPassword = (
			<Container style={styles.formContainer}>
				<TextInput
					onChange={e => {
						this.setState({ email: e.nativeEvent.text })
					}}
					placeholder="Enter your email"
					style={styles.textInput}
					value={email}
				/>
				<SubmitFormButton
					callback={() => this.submitLoginForm(email, password)}
					text="Send"
				/>
				<Text
					onPress={() => {
						this.setState({
							forgotPassword: false,
							loginForm: true,
							registrationForm: false
						})
					}}
					style={styles.formSubText}
				>
					Cancel
				</Text>
			</Container>
		)

		const LoginForm = (
			<View style={styles.formContainer}>
				<TextInput
					onChange={e => {
						this.setState({ email: e.nativeEvent.text })
					}}
					placeholder="Email or username"
					style={styles.textInput}
					value={email}
				/>
				<TextInput
					onChange={e => {
						this.setState({ password: e.nativeEvent.text })
					}}
					placeholder="Password"
					secureTextEntry
					style={styles.textInput}
					value={password}
				/>
				<SubmitFormButton
					callback={() => this.submitLoginForm(email, password)}
					text="Sign In"
				/>
				<Text
					onPress={() => {
						this.setState({
							forgotPassword: true,
							loginForm: false,
							registrationForm: false
						})
					}}
					style={styles.formSubText}
				>
					Forgot password?
				</Text>
				<Text
					onPress={() => {
						this.setState({
							forgotPassword: false,
							loginForm: false,
							registrationForm: true
						})
					}}
					style={styles.formSubText}
				>
					Sign Up
				</Text>
			</View>
		)

		const RegistrationForm = (
			<Container style={styles.formContainer}>
				<TextInput
					onChange={e => {
						this.setState({ name: e.nativeEvent.text })
					}}
					placeholder="Name"
					style={styles.textInput}
					value={name}
				/>
				<TextInput
					onChange={e => {
						this.setState({ username: e.nativeEvent.text })
					}}
					placeholder="Username"
					style={styles.textInput}
					value={username}
				/>
				<TextInput
					onChange={e => {
						this.setState({ email: e.nativeEvent.text })
					}}
					placeholder="Email"
					style={styles.textInput}
					value={email}
				/>
				<TextInput
					onChange={e => {
						this.setState({ password: e.nativeEvent.text })
					}}
					placeholder="Password"
					secureTextEntry
					style={styles.textInput}
					value={password}
				/>
				<SubmitFormButton
					callback={() => this.submitRegistrationForm(email, name, password, username)}
					text="Sign Up"
				/>
				<Text
					onPress={() => {
						this.setState({
							forgotPassword: false,
							loginForm: true,
							registrationForm: false
						})
					}}
					style={styles.formSubText}
				>
					Sign In
				</Text>
			</Container>
		)

		return (
			<Container>
				<AppHeader
					left={() => null}
					right={() => {
						if (userId !== null) {
							return (
								<Icon
									color={Colors.white}
									name="cog"
									onPress={() => this.toggleSettingsVisibility()}
									type="font-awesome"
								/>
							)
						}
						return null
					}}
					title="Profile"
				/>
				{userId === null ? (
					<Container style={styles.container}>
						{forgotPassword && ForgotPassword}
						{loginForm && LoginForm}
						{registrationForm && RegistrationForm}
					</Container>
				) : (
					<ScrollView>
						{settingsVisible ? (
							<View>
								<ListItem
									bottomDivider
									key="pushNotificationsListItem"
									// onPress={() => this.props.getCat({ id: item.id })}
									subtitle="Push notifications"
									title={null}
								/>
								<ListItem
									bottomDivider
									key="locationListItem"
									// onPress={() => this.props.getCat({ id: item.id })}
									subtitle="Location"
									title={null}
								/>
								<ListItem
									bottomDivider
									key="cameraListItem"
									// onPress={() => this.props.getCat({ id: item.id })}
									subtitle="Camera"
									title={null}
								/>
								<ListItem
									bottomDivider
									key="microphoneListItem"
									// onPress={() => this.props.getCat({ id: item.id })}
									subtitle="Microphone"
									title={null}
								/>
								{userId !== null && (
									<ListItem
										bottomDivider
										key="logoutListItem"
										onPress={() => this.props.logout()}
										subtitle="Logout"
										title={null}
									/>
								)}
							</View>
						) : (
							user.id ? (
								<View>
									<View style={styles.imageWrapper}>
										<Avatar rounded icon={{ name: 'home' }} size="large" />
									</View>
									<Text style={styles.h1}>{user.name}</Text>
									<Text style={styles.usernameText}>@{user.username}</Text>

									<Text style={styles.myCatsH2}>My Cats</Text>
									<CatGrid cats={cats} catImages={catImages} user={user} />
								</View>
							) : (
								<ActivityIndicator />
							)
						)}
					</ScrollView>
				)}
			</Container>
		)
	}
}

ProfileScreen.navigationOptions = {
	header: null
}

ProfileScreen.propTypes = {
	catCount: PropTypes.number,
	catImages: PropTypes.array,
	cats: PropTypes.array,
	fetchUser: PropTypes.func,
	getCurrentUser: PropTypes.func,
	login: PropTypes.func,
	logout: PropTypes.func,
	register: PropTypes.func,
	resetPassword: PropTypes.func,
	setUserId: PropTypes.func,
	user: PropTypes.object,
	userId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
}

ProfileScreen.defaultProps = {
	fetchUser,
	getCurrentUser,
	login,
	logout,
	register,
	resetPassword,
	setUserId,
	user: {
		dateCreated: null,
		id: null,
		img: null,
		name: null,
		pushNotificationsEnabled: true,
		verificationCode: null
	},
	userId: null
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
		login,
		logout,
		register,
		resetPassword,
		setUserId
	}
)(ProfileScreen)
