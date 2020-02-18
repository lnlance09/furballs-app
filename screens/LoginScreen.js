import AppHeader from "../components/AppHeader"
import ButtonComponent from "../components/ButtonComponent"
import PropTypes from "prop-types"
import RegisterPic from "../assets/images/register.svg"
import store from "../store"
import React, { Component } from "react"
import { validateEmail } from "../tools/textFunctions"
import { connect } from "react-redux"
import { style } from "./styles/LoginScreen"
import { login, register, updateUser } from "@redux/actions/app"
import { Dimensions, StyleSheet, View } from "react-native"
import { TextField } from "react-native-material-textfield"
import { Container, Text, Toast } from "native-base"

import Amplify, { Auth } from "aws-amplify"
import config from "../aws-exports"
Amplify.configure(config)

const { width } = Dimensions.get("window")

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
			newPassword: "",
			registerEmail: "",
			registerPassword: "",
			registrationForm: false,
			resetEmail: "",
			screenTitle: "Sign in",
			showVerification: false,
			username: "",
			verificationCode: ""
		}
	}

	async checkUsername(username) {
		const response = await fetch(`http://localhost:8888/cats/api/users/checkUsername?username=${username}`, {
			headers: {
				"Content-Type": "application/json"
			}
		})
		const json = await response.json()
		return json
	}

	resetPassword(email) {
		if (email === "") {
			return
		}

		Auth.forgotPassword(email)
			.then(() => {
				this.setState({
					forgotPassword: false,
					loginForm: false,
					registrationForm: false,
					screenTitle: "Sign in",
					showVerification: true
				})
			})
			.catch(err => {
				Toast.show({
					buttonText: null,
					style: {
						bottom: 64
					},
					text: err.message,
					type: "danger"
				})
			})
	}

	async submitLoginForm(email, password) {
		if (email === "") {
			return null
		}

		if (password === "") {
			return null
		}

		return await Auth.signIn({
				password,
				username: email
			})
				.then(async user => {
					const uuid = user.username
					console.log("uuid")
					console.log(uuid)

					const login = await this.props.login({
						email,
						navigate: this.navigate,
						password,
						redirect: true,
						verified: true
					})

					console.log("login")
					console.log(login)
					return login
				})
				.catch(err => {
					console.log("login error with AWS")
					console.log(err)

					// The user has not verified their email
					if (err.code === "UserNotConfirmedException") {
						Auth.resendSignUp(email).then(json => {
							console.log("resend sign up")
							console.log(json)

							 const login = this.props.login({
								email,
								navigate: this.navigate,
								password,
								redirect: false,
								verified: false
							})

							this.navigate("VerificationCode")
							return login
						}).catch(err => {
							Toast.show({
								buttonText: null,
								style: {
									bottom: 64
								},
								text: err.message,
								type: "danger"
							})

							return err
						})
					}

					Toast.show({
						buttonText: null,
						style: {
							bottom: 64
						},
						text: err.message,
						type: "danger"
					})

					return err
				})
	}

	submitRegistrationForm(email, name, password, username) {
		if (name === "") {
			Toast.show({
				style: {
					bottom: 64
				},
				text: "Please enter your name",
				type: "danger"
			})
			return
		}

		console.log("check username")
		const check = this.checkUsername(username)
		check.then(check => {
			if (check.error) {
				Toast.show({
					style: {
						bottom: 64
					},
					text: check.error,
					type: "danger"
				})
				return check
			}
		})

		console.log("after check username")

		if (!validateEmail(email)) {
			Toast.show({
				style: {
					bottom: 64
				},
				text: "Please enter a valid email address",
				type: "danger"
			})
			return
		}

		if (password.length < 7) {
			Toast.show({
				style: {
					bottom: 64
				},
				text: "Your password must contain at least 7 characters",
				type: "danger"
			})
			return
		}

		Auth.signUp({
			username: email,
			password,
			attributes: {
				email,
				name,
			},
			validationData: []
		})
			.then(data => {
				console.log("register data")
				console.log(data)
				this.props.register({
					email,
					name,
					navigate: this.navigate,
					password,
					username,
					uuid: data.userSub
				})

				return data
			})
			.catch(err => {
				console.log("register data error")
				console.log(err)
				Toast.show({
					style: {
						bottom: 64
					},
					text: err.message,
					type: "danger"
				})


				return err
			})
	}

	submitVerificationCode(code, email, password) {
		if (code.length !== 6) {
			return
		}

		if (password.length < 7) {
			Toast.show({
				style: {
					bottom: 64
				},
				text: "Your password must contain at least 7 characters",
				type: "danger"
			})
			return
		}

		Auth.forgotPasswordSubmit(email, code, password)
			.then(() => {
				console.log("forgotPasswordSubmit")

				const login = this.submitLoginForm(email, password)
				login.then(data => {
					const _state = store.getState()
					const bearer = _state.app.token
					console.log(data)

					this.props.updateUser({
						bearer,
						data: {
							password
						},
						id: data.id
					})
				})
			})
			.catch(err => console.log(err))
	}

	render() {
		const {
			forgotPassword,
			loginEmail,
			loginForm,
			loginPassword,
			name,
			newPassword,
			registerEmail,
			registerPassword,
			registrationForm,
			resetEmail,
			screenTitle,
			showVerification,
			username,
			verificationCode
		} = this.state

		/*
		const login = this.submitLoginForm("lnlance09@gmail.com", "password1")
		console.log("login promise")
		console.log(login)
		login.then(data => {
			console.log("promise complete")
			console.log(data)
		})
		*/

		const SubmitFormButton = ({ callback, text }) => {
			return (
				<ButtonComponent
					buttonStyle={styles.formSubmitBtn}
					onPress={() => callback()}
					text={text}
					textStyle={styles.formSubmitBtnText}
				/>
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
				<SubmitFormButton callback={() => this.resetPassword(resetEmail)} text="Send" />
				<Text
					onPress={() => {
						this.setState({
							forgotPassword: false,
							loginForm: true,
							registrationForm: false,
							screenTitle: "Sign in",
							showVerification: false
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
							screenTitle: "Reset",
							showVerification: false
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
							screenTitle: "Sign up",
							showVerification: false
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
					callback={() =>
						this.submitRegistrationForm(registerEmail, name, registerPassword, username)
					}
					text="Sign Up"
				/>
				<Text
					onPress={() => {
						this.setState({
							forgotPassword: false,
							loginForm: true,
							registrationForm: false,
							screenTitle: "Sign in",
							showVerification: false
						})
					}}
					style={styles.formSubText}
				>
					Sign In
				</Text>
			</Container>
		)

		const VerificationCodeForm = (
			<Container style={styles.formContainer}>
				<TextField
					autoCapitalize="none"
					label="Enter your verification code"
					onChangeText={verificationCode => {
						this.setState({ verificationCode })
					}}
					value={verificationCode}
				/>
				<TextField
					autoCapitalize="none"
					label="New password"
					onChangeText={newPassword => {
						this.setState({ newPassword })
					}}
					secureTextEntry
					value={newPassword}
				/>
				<SubmitFormButton
					callback={() => this.submitVerificationCode(verificationCode, resetEmail, newPassword)}
					text="Submit"
				/>
				<Text
					onPress={() => {
						this.setState({
							forgotPassword: false,
							loginForm: false,
							registrationForm: false,
							screenTitle: "Sign in",
							showVerification: false
						})
					}}
					style={styles.formSubText}
				>
					Cancel
				</Text>
			</Container>
		)

		return (
			<Container>
				<AppHeader left={() => null} right={() => null} title={screenTitle} />
				<Container style={styles.container}>
					<RegisterPic width={width} height={170} />
					{showVerification && VerificationCodeForm}
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
	navigation: PropTypes.object,
	login: PropTypes.func,
	register: PropTypes.func,
	updateUser: PropTypes.func
}

LoginScreen.defaultProps = {
	login,
	register,
	updateUser
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
		login,
		register,
		updateUser
	}
)(LoginScreen)