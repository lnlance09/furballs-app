import { style } from "./styles/LoginForm"
import { connect } from "react-redux"
import { login } from "@redux/actions/user"
import { StyleSheet, View } from "react-native"
import { Container } from "native-base"
import { TextField } from "react-native-material-textfield"
import Button from "@components/primary/Button"
import PropTypes from "prop-types"
import React, { Component } from "react"
import StyledText from "@components/primary/StyledText"

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

	submitLoginForm = async (email, password) => {
		if (email === "") {
			return
		}

		if (password === "") {
			return
		}

		await this.props.login({
			email,
			navigate: this.navigate,
			password,
			redirect: true
		})
	}

	render() {
		const { email, password } = this.state

		const SubmitFormButton = ({ callback, text }) => {
			return (
				<Button
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
				<StyledText
					onPress={() => {
						this.props.toggleResetForm()
					}}
					style={styles.formSubText}
					text="Forgot password?"
				/>
				<StyledText
					onPress={() => {
						this.props.toggleRegistrationForm()
					}}
					style={styles.formSubText}
					text="Sign Up"
				/>
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