import AppHeader from "../components/AppHeader"
import ButtonComponent from "../components/ButtonComponent"
import Colors from "../constants/Colors"
import PropTypes from "prop-types"
import store from "../store"
import React, { Component } from "react"
import { logout, verifyEmail } from "@redux/actions/app"
import { connect } from "react-redux"
import { style } from "./styles/VerificationCodeScreen"
import { AsyncStorage, StyleSheet } from "react-native"
import { Icon } from "react-native-elements"
import { TextField } from "react-native-material-textfield"
import { Container, Text, Toast } from "native-base"

import Amplify, { Auth } from "aws-amplify"
import config from "../aws-exports"
Amplify.configure(config)

const styles = StyleSheet.create(style)

class VerificationCodeScreen extends Component {
	constructor(props) {
		super(props)

		const { navigate } = this.props.navigation
		this.navigate = navigate

		this.state = {
			code: ""
		}
	}

	async submitVerificationCode(code) {
		console.log("submitVerificationCode")
		console.log(code)

		const _state = store.getState()
		const user = _state.app.user
		const email = user.email

		if (code.length !== 6) {
			return
		}

		console.log("email")
		console.log(email)

		Auth.confirmSignUp(email, code, {
			forceAliasCreation: true
		})
			.then(data => {
				this.props.verifyEmail()
				this.navigate("Profile")
			})
			.catch(err => {
				console.log(err)
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
		const { code } = this.state

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

		return (
			<Container>
				<AppHeader
					left={() => (
						<Icon
							color={Colors.black}
							name="arrow-back"
							onPress={() => {
								this.props.navigation.goBack()
							}}
						/>
					)}
					right={() => null}
					title="Verify"
				/>
				<Container style={styles.container}>
					<TextField
						autoCapitalize="none"
						label="Verification code"
						onChangeText={code => {
							this.setState({ code })
						}}
						value={code}
					/>
					<SubmitFormButton
						callback={() => this.submitVerificationCode(code)}
						text="Verify"
					/>
					<Text
						onPress={() => {
							this.props.logout()
							this.navigate("Login")
						}}
						style={styles.formSubText}
					>
						Sign out
					</Text>
				</Container>
			</Container>
		)
	}
}

VerificationCodeScreen.navigationOptions = {
	header: null
}

VerificationCodeScreen.propTypes = {
	logout: PropTypes.func,
	navigation: PropTypes.object,
	verifyEmail: PropTypes.func
}

VerificationCodeScreen.defaultProps = {
	logout,
	verifyEmail
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
		logout,
		verifyEmail
	}
)(VerificationCodeScreen)