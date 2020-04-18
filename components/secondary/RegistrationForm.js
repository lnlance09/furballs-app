import ButtonComponent from "@components/primary/ButtonComponent"
import PropTypes from "prop-types"
import store from "@store"
import React, { Component } from "react"
import { validateEmail } from "@tools/textFunctions"
import { connect } from "react-redux"
import { style } from "./styles/LoginForm"
import { register } from "@redux/actions/user"
import { Dimensions, StyleSheet, View } from "react-native"
import { TextField } from "react-native-material-textfield"
import { Container, Text, Toast } from "native-base"

const { width } = Dimensions.get("window")
const styles = StyleSheet.create(style)

class RegistrationForm extends Component {
	constructor(props) {
		super(props)

		const { navigate } = this.props.navigation
		this.navigate = navigate

		this.state = {
			email: "",
			name: "",
			password: "",
			username: ""
		}
	}

	async checkUsername(username) {
		const response = await fetch(
			`http://localhost:8888/cats/api/users/checkUsername?username=${username}`,
			{
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
		const json = await response.json()
		return json
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

		this.props.register({
			email,
			name,
			navigate: this.navigate,
			password,
			username
		})
	}

	render() {
		const { email, name, password, username } = this.state

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

		const MainForm = (
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
					onChangeText={email => {
						this.setState({ email })
					}}
					style={styles.textInput}
					value={email}
				/>
				<TextField
					autoCompleteType="password"
					label="Password"
					onChangeText={password => {
						this.setState({ password })
					}}
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
						this.props.toggleRegistrationForm()
					}}
					style={styles.formSubText}
				>
					Sign In
				</Text>
			</Container>
		)

		return <Container>{MainForm}</Container>
	}
}

RegistrationForm.propTypes = {
	navigation: PropTypes.object,
	register: PropTypes.func,
	toggleRegistrationForm: PropTypes.func
}

RegistrationForm.defaultProps = {
	register
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
		register
	}
)(RegistrationForm)
