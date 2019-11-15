import AppHeader from "../components/AppHeader"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"
import { style } from "./styles/ChangePasswordScreen"
import { changePassword } from "@redux/actions/profile"
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

class ChangePasswordScreen extends Component {
	constructor(props) {
		super(props)

		const { navigate } = this.props.navigation
		this.navigate = navigate

		this.state = {
			confirmPassword: "",
			newPassword: ""
		}
	}

	changePassword(newPassword, confirmPassword) {
		console.log("change password")

		if (newPassword.length < 7) {
			Toast.show({
				buttonText: null,
				text: "Your password must contain at least 7 characters",
				type: "danger"
			})
		}

		if (newPassword !== confirmPassword) {
			Toast.show({
				buttonText: null,
				text: "Your password do not match",
				type: "danger"
			})
		}

		if (newPassword === confirmPassword && newPassword.length > 6) {
			this.props.changePassword({
				navigate: this.navigate,
				password: newPassword
			})
		}
	}

	render() {
		const { confirmPassword, newPassword } = this.state

		const SubmitFormButton = ({ callback, text }) => {
			return (
				<Button block onPress={() => callback()} style={styles.formSubmitBtn}>
					<Text style={{ fontWeight: "bold" }}>{text}</Text>
				</Button>
			)
		}

		return (
			<Container>
				<AppHeader
					left={() => null}
					right={() => null}
					title="Change password"
				/>
				<Container style={styles.container}>
					<TextField
						autoCapitalize="none"
						label="New password"
						onChangeText={newPassword => {
							this.setState({ newPassword })
						}}
						secureTextEntry
						value={newPassword}
					/>
					<TextField
						autoCapitalize="none"
						label="Confirm password"
						onChangeText={confirmPassword => {
							this.setState({ confirmPassword })
						}}
						secureTextEntry
						value={confirmPassword}
					/>
					<SubmitFormButton
						callback={() => this.changePassword(newPassword, confirmPassword)}
						text="Change Password"
					/>
				</Container>
			</Container>
		)
	}
}

ChangePasswordScreen.navigationOptions = {
	header: null
}

ChangePasswordScreen.propTypes = {
	changePassword: PropTypes.func,
}

ChangePasswordScreen.defaultProps = {
	changePassword
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
		changePassword
	}
)(ChangePasswordScreen)
