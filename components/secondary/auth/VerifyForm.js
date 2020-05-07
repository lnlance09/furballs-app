import { style } from "./styles/LoginForm"
import { connect } from "react-redux"
import { validateEmail } from "@tools/textFunctions"
import { register } from "@redux/actions/user"
import { Dimensions, StyleSheet, View } from "react-native"
import { TextField } from "react-native-material-textfield"
import { Container, Toast } from "native-base"
import Button from "@components/primary/Button"
import PropTypes from "prop-types"
import React, { Component } from "react"
import store from "@store"
import StyledText from "@components/primary/StyledText"

const { width } = Dimensions.get("window")
const styles = StyleSheet.create(style)

class VerifyForm extends Component {
	constructor(props) {
		super(props)

		const { navigate } = this.props.navigation
		this.navigate = navigate

		this.state = {
			email: "",
			password: ""
		}
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

		this.props.updateUser({
			bearer,
			data: {
				password
			},
			id: data.id
		})
	}

	render() {
		const { code, email, password } = this.state

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
			<Container style={styles.formContainer}>
				<TextField
					autoCapitalize="none"
					label="Enter your verification code"
					onChangeText={code => {
						this.setState({ code })
					}}
					value={code}
				/>
				<TextField
					autoCapitalize="none"
					label="New password"
					onChangeText={password => {
						this.setState({ password })
					}}
					secureTextEntry
					value={password}
				/>
				<SubmitFormButton
					callback={() => this.submitVerificationCode(code, email, password)}
					text="Submit"
				/>
				<StyledText
					onPress={() => {}}
					style={styles.formSubText}
					text="Cancel"
				/>
			</Container>
		)

		return <Container>{MainForm}</Container>
	}
}

VerifyForm.propTypes = {
	navigation: PropTypes.object,
	toggleForgotPassword: PropTypes.func,
	toggleSignUp: PropTypes.func
}

VerifyForm.defaultProps = {}

const mapStateToProps = (state, ownProps) => {
	return {
		...state.app,
		...ownProps
	}
}

export default connect(
	mapStateToProps,
	{}
)(VerifyForm)