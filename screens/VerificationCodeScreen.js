import AppHeader from "../components/AppHeader"
import ButtonComponent from "../components/ButtonComponent"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"
import { style } from "./styles/VerificationCodeScreen"
import { submitVerificationCode } from "@redux/actions/profile"
import { AsyncStorage, StyleSheet } from "react-native"
import { TextField } from "react-native-material-textfield"
import { Container, Text } from "native-base"

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
		const email = (await AsyncStorage.getItem("email")) || null
		console.log("submitVerificationCode")
		console.log(code)
		console.log(email)
		if (code !== "") {
			this.props.submitVerificationCode({
				code,
				email,
				navigate: this.navigate
			})
		}
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
				<AppHeader left={() => null} right={() => null} title="Verify" />
				<Container style={styles.container}>
					<TextField
						autoCapitalize="none"
						label="Verification code"
						onChangeText={code => {
							this.setState({ code })
						}}
						// secureTextEntry
						value={code}
					/>
					<SubmitFormButton
						callback={() => this.submitVerificationCode(code)}
						text="Verify"
					/>
					<Text
						onPress={() => {
							this.props.navigation.goBack()
						}}
						style={styles.formSubText}
					>
						Back
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
	navigation: PropTypes.object,
	submitVerificationCode: PropTypes.func
}

VerificationCodeScreen.defaultProps = {
	submitVerificationCode
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
		submitVerificationCode
	}
)(VerificationCodeScreen)
