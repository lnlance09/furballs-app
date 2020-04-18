import ButtonComponent from "@components/primary/ButtonComponent"
import PropTypes from "prop-types"
import store from "@store"
import React, { Component } from "react"
import { validateEmail } from "@tools/textFunctions"
import { connect } from "react-redux"
import { style } from "./styles/LoginForm"
import { login } from "@redux/actions/user"
import { Dimensions, StyleSheet, View } from "react-native"
import { TextField } from "react-native-material-textfield"
import { Container, Text, Toast } from "native-base"

const { width } = Dimensions.get("window")
const styles = StyleSheet.create(style)

class LoginForm extends Component {
	constructor(props) {
		super(props)

		const { navigate } = this.props.navigation
		this.navigate = navigate

		this.state = {
			email: "",
			password: ""
		}
	}

	async submitLoginForm(email, password) {
		if (email === "") {
			return null
		}

		if (password === "") {
			return null
		}

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
	}

	render() {
		const { email, password } = this.state

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
			<View style={styles.formContainer}>
				<TextField
					autoCapitalize="none"
					inputContainerStyle={styles.textInput}
					label="Email or username"
					onChangeText={email => {
						this.setState({ email })
					}}
					value={email}
				/>
				<TextField
					inputContainerStyle={styles.textInput}
					label="Password"
					onChangeText={password => {
						this.setState({ password })
					}}
					secureTextEntry
					value={password}
				/>
				<SubmitFormButton
					callback={() => this.submitLoginForm(email, password)}
					text="Sign In"
				/>
				<Text
					onPress={() => {
						this.props.toggleResetForm()
					}}
					style={styles.formSubText}
				>
					Forgot password?
				</Text>
				<Text
					onPress={() => {
						this.props.toggleRegistrationForm()
					}}
					style={styles.formSubText}
				>
					Sign Up
				</Text>
			</View>
		)

		return <Container>{MainForm}</Container>
	}
}

LoginForm.propTypes = {
	login: PropTypes.func,
	navigation: PropTypes.object,
	toggleRegistrationForm: PropTypes.func,
	toggleResetForm: PropTypes.func
}

LoginForm.defaultProps = {
	login
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
		login
	}
)(LoginForm)
