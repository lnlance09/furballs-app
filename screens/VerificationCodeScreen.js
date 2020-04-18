import AppHeader from "@components/primary/AppHeader"
import ButtonComponent from "@components/primary/ButtonComponent"
import Colors from "@constants/Colors"
import PropTypes from "prop-types"
import RegisterPic from "@assets/images/register.svg"
import store from "@store"
import React, { Component } from "react"
import { logout, verifyEmail } from "@redux/actions/user"
import { connect } from "react-redux"
import { style } from "./styles/VerificationCodeScreen"
import { AsyncStorage, Dimensions, StyleSheet } from "react-native"
import { Icon } from "react-native-elements"
import { TextField } from "react-native-material-textfield"
import { Container, Text, Toast } from "native-base"

const { width } = Dimensions.get("window")
const styles = StyleSheet.create(style)

class VerificationCodeScreen extends Component {
	constructor(props) {
		super(props)

		const { navigate } = this.props.navigation
		this.navigate = navigate

		const _state = store.getState()
		const user = _state.app.user

		console.log("user")
		console.log(user)

		this.state = {
			code: "",
			user
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

	async checkEmailVerification(id) {
		/*
		const response = await fetch(`http://localhost:8888/cats/api/users/getUser?id=${id}`, {
			headers: {
				"Content-Type": "application/json"
			}
		})
		const json = await response.json()
		console.log("checkEmailVerification")
		console.log(json)
		return json
		*/

		Auth.currentAuthenticatedUser({
			bypassCache: true
		})
			.then(user => console.log(user))
			.catch(err => console.log(err))
	}

	render() {
		const { code, user } = this.state

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
					<Text
						onPress={() => {
							this.props.logout()
							this.navigate("Login")
						}}
						style={styles.verifyText}
					>
						Please verify your email
					</Text>
					<RegisterPic width={width} height={170} />
					<SubmitFormButton
						callback={() => this.checkEmailVerification(user.id)}
						text="I've verified my email"
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
