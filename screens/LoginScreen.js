import AppHeader from "../components/AppHeader"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"
import { style } from "./styles/LoginScreen"
import { getCurrentUser, login, register, resetPassword } from "@redux/actions/profile"
import {
	StyleSheet,
	TextInput,
	View
} from "react-native"
import {
	TextField,
	FilledTextField,
	OutlinedTextField,
} from "react-native-material-textfield"
import { Button, Container, Text, Toast } from "native-base"

const styles = StyleSheet.create(style)

class LoginScreen extends Component {
	constructor(props) {
		super(props)

		const { navigate } = this.props.navigation
		this.navigate = navigate

		this.state = {
			forgotPassword: false,
			loginEmail: "",
			loginPassword: "",
			loginForm: true,
			name: "",
			registerEmail: "",
			registerPassword: "",
			registrationForm: false,
			resetEmail: "",
			screenTitle: "Sign in",
			showToast: false,
			username: ""
		}
	}

	resetPassword(email) {
		console.log("resetPassword")
		console.log(email)
		if (email !== "") {
			this.props.resetPassword({ email, navigate: this.navigate })
		}
	}

	submitLoginForm(email, password) {
		if (email !== "" && password !== "") {
			this.props.login({ email, navigate: this.navigate, password })
		}
	}

	submitRegistrationForm(email, name, password, username) {
		if (name === "") {
			Toast.show({
				buttonText: "Okay",
				duration: 3000,
				text: "Please enter your name",
				type: "danger"
			})
			return false
		}

		if (username === "") {
			Toast.show({
				buttonText: "Okay",
				duration: 3000,
				text: "Please enter your username",
				type: "danger"
			})
			return false
		}

		if (email === "") {
			Toast.show({
				buttonText: "Okay",
				duration: 3000,
				text: "Please enter a valid email address",
				type: "danger"
			})
			return false
		}

		if (password.length < 7) {
			Toast.show({
				buttonText: "Okay",
				duration: 3000,
				text: "Your password must contain at lest 7 characters",
				type: "danger"
			})
			return false
		}

		if (email !== "" && password.length > 6 && name.length > 1 && username.length > 1) {
			this.props.register({
				email,
				name,
				navigate: this.navigate,
				password,
				username
			})
		}
	}

	render() {
		const {
			forgotPassword,
			loginEmail,
			loginForm,
			loginPassword,
			name,
			registerEmail,
			registerPassword,
			registrationForm,
			resetEmail,
			screenTitle,
			username
		} = this.state

		console.log("profile screen")
		console.log(this.props)

		const SubmitFormButton = ({ callback, text }) => {
			return (
				<Button block onPress={() => callback()} style={styles.formSubmitBtn}>
					<Text style={{ fontWeight: "bold" }}>{text}</Text>
				</Button>
			)
		}

		const ForgotPassword = (
			<Container style={styles.formContainer}>
				<TextField
					autoCapitalize="none"
					label="Enter your email"
					onChangeText={resetEmail => {
						this.setState({ resetEmail })
					}}
					value={resetEmail}
				/>
				<SubmitFormButton
					callback={() => this.resetPassword(resetEmail)}
					text="Send"
				/>
				<Text
					onPress={() => {
						this.setState({
							forgotPassword: false,
							loginForm: true,
							registrationForm: false,
							screenTitle: "Sign in"
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
				<TextField
					autoCapitalize="none"
					inputContainerStyle={styles.textInput}
					label="Email or username"
					onChangeText={loginEmail => {
						this.setState({ loginEmail })
					}}
					value={loginEmail}
				/>
				<TextField
					inputContainerStyle={styles.textInput}
					label="Password"
					onChangeText={loginPassword => {
						this.setState({ loginPassword })
					}}
					secureTextEntry
					value={loginPassword}
				/>
				<SubmitFormButton
					callback={() => this.submitLoginForm(loginEmail, loginPassword)}
					text="Sign In"
				/>
				<Text
					onPress={() => {
						this.setState({
							forgotPassword: true,
							loginForm: false,
							registrationForm: false,
							screenTitle: "Reset"
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
							registrationForm: true,
							screenTitle: "Sign up"
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
				<TextField
					autoCompleteType="name"
					label="Name"
					onChangeText={name => {
						this.setState({ name })
					}}
					style={styles.textInput}
					value={name}
				/>
				<TextField
					autoCompleteType="username"
					label="Username"
					onChangeText={username => {
						this.setState({ username })
					}}
					style={styles.textInput}
					value={username}
				/>
				<TextField
					autoCapitalize="none"
					autoCompleteType="email"
					keyboardType="email-address"
					label="Email"
					onChangeText={registerEmail => {
						this.setState({ registerEmail })
					}}
					style={styles.textInput}
					value={registerEmail}
				/>
				<TextField
					autoCompleteType="password"
					label="Password"
					onChangeText={registerPassword => {
						this.setState({ registerPassword })
					}}
					secureTextEntry
					style={styles.textInput}
					value={registerPassword}
				/>
				<SubmitFormButton
					callback={() => this.submitRegistrationForm(registerEmail, name, registerPassword, username)}
					text="Sign Up"
				/>
				<Text
					onPress={() => {
						this.setState({
							forgotPassword: false,
							loginForm: true,
							registrationForm: false,
							screenTitle: "Sign in"
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
					right={() => null}
					title={screenTitle}
				/>
				<Container style={styles.container}>
					{forgotPassword && ForgotPassword}
					{loginForm && LoginForm}
					{registrationForm && RegistrationForm}
				</Container>
			</Container>
		)
	}
}

LoginScreen.navigationOptions = {
	header: null
}

LoginScreen.propTypes = {
	authenticated: PropTypes.bool,
	getCurrentUser: PropTypes.func,
	login: PropTypes.func,
	navigation: PropTypes.object,
	register: PropTypes.func,
	resetPassword: PropTypes.func,
	user: PropTypes.object
}

LoginScreen.defaultProps = {
	getCurrentUser,
	login,
	register,
	resetPassword,
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
		getCurrentUser,
		login,
		register,
		resetPassword,
	}
)(LoginScreen)
