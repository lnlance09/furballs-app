import PropTypes from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchUser, login, register } from "../actions/profile"
import {
	ActivityIndicator,
	AsyncStorage,
	ImageBackground,
	ScrollView,
	StyleSheet,
	View
} from "react-native"
import { Button, Container, Form, Input, Item, Text, Toast } from "native-base"
import { Image } from "react-native-elements"
import { CatCard } from "../components/CatCard"

class ProfileScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: "",
			forgotPassword: false,
			loginForm: true,
			name: "",
			password: "",
			registrationForm: false,
			showToast: false,
			userId: null,
			username: ""
		}
	}

	async componentDidMount() {
		let userId = ""
		try {
			userId = (await AsyncStorage.getItem("userId")) || null
		} catch (e) {
			console.log(e.message)
		}

		this.setState({ userId })

		if (userId) {
			this.props.fetchUser({ id: this.state.id })
		}
	}

	async createSession(userId) {
		try {
			await AsyncStorage.setItem("userId", userId)
		} catch (e) {
			console.log(e.message)
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

	render() {
		const {
			email,
			forgotPassword,
			loginForm,
			name,
			password,
			registrationForm,
			userId,
			username
		} = this.state

		const styles = StyleSheet.create({
			container: {},
			formSubText: {
				marginTop: 8,
				textAlign: "left"
			},
			formSubmitBtn: {
				marginTop: 10
			},
			imgContainer: {
				alignItems: "center",
				justifyContent: "center"
			},
			logo: {
				height: 150,
				width: 150
			}
		})

		const SubmitFormButton = ({ callback, text }) => {
			return (
				<Button
					block
					onPress={() => callback()}
					primary
					style={styles.formSubmitBtn}
					warning
				>
					<Text style={{ fontWeight: "bold" }}>{text}</Text>
				</Button>
			)
		}

		const ForgotPassword = (
			<Container style={{ padding: 10 }}>
				<Form>
					<Item regular>
						<Input
							onChange={e => {
								this.setState({ email: e.nativeEvent.text })
							}}
							placeholder="Enter your email"
							value={email}
						/>
					</Item>
				</Form>
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
			<Container style={{ padding: 10 }}>
				<Form>
					<Item regular>
						<Input
							onChange={e => {
								this.setState({ email: e.nativeEvent.text })
							}}
							placeholder="Email or username"
							value={email}
						/>
					</Item>
					<Item regular style={{ marginTop: 10 }}>
						<Input
							onChange={e => {
								this.setState({ password: e.nativeEvent.text })
							}}
							placeholder="Password"
							secureTextEntry
							value={password}
						/>
					</Item>
				</Form>
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
				
			</Container>
		)

		const RegistrationForm = (
			<Container style={{ padding: 10 }}>
				<Form>
					<Item regular>
						<Input
							onChange={e => {
								this.setState({ name: e.nativeEvent.text })
							}}
							placeholder="Name"
							value={name}
						/>
					</Item>
					<Item regular style={{ marginTop: 10 }}>
						<Input
							onChange={e => {
								this.setState({ username: e.nativeEvent.text })
							}}
							placeholder="Username"
							value={username}
						/>
					</Item>
					<Item regular style={{ marginTop: 10 }}>
						<Input
							onChange={e => {
								this.setState({ email: e.nativeEvent.text })
							}}
							placeholder="Email"
							value={email}
						/>
					</Item>
					<Item regular style={{ marginTop: 10 }}>
						<Input
							onChange={e => {
								this.setState({ password: e.nativeEvent.text })
							}}
							placeholder="Password"
							secureTextEntry
							value={password}
						/>
					</Item>
				</Form>
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
				{userId === null ? (
					<Container style={styles.container}>
						<ImageBackground
							source={{
								uri:
									"https://d17fnq9dkz9hgj.cloudfront.net/uploads/2012/11/152964589-welcome-home-new-cat-632x475.jpg"
							}}
							style={{
								width: "100%",
								height: 250
							}}
						/>

						{forgotPassword && ForgotPassword}
						{loginForm && LoginForm}
						{registrationForm && RegistrationForm}
					</Container>
				) : (
					<View style={styles.container}>
						<ScrollView>
							<Image
								containerStyle={styles.imgContainer}
								PlaceholderContent={<ActivityIndicator />}
								style={styles.logo}
								source={{
									uri: "https://facebook.github.io/react-native/img/tiny_logo.png"
								}}
							/>
						</ScrollView>
					</View>
				)}
			</Container>
		)
	}
}

ProfileScreen.navigationOptions = {
	title: "Profile",
	user: {
		dateCreated: null,
		id: null,
		img: null,
		name: null,
		pushNotificationsEnabled: true,
		verificationCode: null
	}
}

ProfileScreen.propTypes = {
	fetchUser: PropTypes.func,
	login: PropTypes.func,
	register: PropTypes.func,
	user: PropTypes.object
}

ProfileScreen.defaultProps = {
	fetchUser,
	login,
	register
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
		login,
		register
	}
)(ProfileScreen)
