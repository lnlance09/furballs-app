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

class ResetPassForm extends Component {
	constructor(props) {
		super(props)

		const { navigate } = this.props.navigation
		this.navigate = navigate

		this.state = {
			email: ""
		}
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

	render() {
		const { email } = this.state

		console.log("reset pass form")

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
					autoCapitalize="none"
					label="Enter your email"
					onChangeText={email => {
						this.setState({ email })
					}}
					value={email}
				/>
				<SubmitFormButton callback={() => this.resetPassword(email)} text="Send" />
				<Text
					onPress={() => {
						this.props.toggleResetForm()
					}}
					style={styles.formSubText}
				>
					Cancel
				</Text>
			</Container>
		)

		return <Container>{MainForm}</Container>
	}
}

ResetPassForm.propTypes = {
	navigation: PropTypes.object,
	toggleResetForm: PropTypes.func
}

ResetPassForm.defaultProps = {}

const mapStateToProps = (state, ownProps) => {
	return {
		...state.app,
		...ownProps
	}
}

export default connect(
	mapStateToProps,
	{}
)(ResetPassForm)
