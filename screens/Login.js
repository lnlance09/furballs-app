import { style } from "./styles/Login"
import { connect } from "react-redux"
import { validateEmail } from "@tools/textFunctions"
import { updateUser } from "@redux/actions/user"
import { Dimensions, StyleSheet, View } from "react-native"
import { TextField } from "react-native-material-textfield"
import { Container, Text, Toast } from "native-base"
import AppHeader from "@components/primary/AppHeader"
import Button from "@components/primary/Button"
import LoginForm from "@components/secondary/auth/LoginForm"
import PropTypes from "prop-types"
import React, { Component } from "react"
import RegisterPic from "@assets/images/register.svg"
import RegistrationForm from "@components/secondary/auth/RegistrationForm"
import ResetPassForm from "@components/secondary/auth/ResetPassForm"
import store from "@store"
import VerifyForm from "@components/secondary/auth/VerifyForm"

const { width } = Dimensions.get("window")
const styles = StyleSheet.create(style)

class LoginScreen extends Component {
	constructor(props) {
		super(props)

		const { navigate } = this.props.navigation
		this.navigate = navigate

		this.state = {
			screenTitle: "Sign In",
			showLoginForm: true,
			showRegistrationForm: false,
			showResetForm: false,
			showVerificationForm: false
		}
	}

	toggleLoginForm = () => this.setState({ showLoginForm: !this.state.showLoginForm })

	toggleRegistrationForm = () =>
		this.setState({
			showLoginForm: !this.state.showLoginForm,
			showRegistrationForm: !this.state.showRegistrationForm
		})

	toggleResetForm = () => {
		this.setState({
			showResetForm: !this.state.showResetForm,
			showLoginForm: !this.state.showLoginForm
		})
	}

	render() {
		const {
			screenTitle,
			showLoginForm,
			showRegistrationForm,
			showResetForm,
			showVerificationForm
		} = this.state

		return (
			<Container>
				<AppHeader left={() => null} right={() => null} title={screenTitle} />
				<Container style={styles.container}>
					<RegisterPic height={170} width={width} />

					{showLoginForm && (
						<LoginForm
							navigation={this.props.navigation}
							toggleRegistrationForm={this.toggleRegistrationForm}
							toggleResetForm={this.toggleResetForm}
						/>
					)}

					{showRegistrationForm && (
						<RegistrationForm
							navigation={this.props.navigation}
							toggleRegistrationForm={this.toggleRegistrationForm}
						/>
					)}

					{showResetForm && (
						<ResetPassForm
							navigation={this.props.navigation}
							toggleResetForm={this.toggleResetForm}
						/>
					)}

					{showVerificationForm && <VerifyForm navigation={this.props.navigation} />}
				</Container>
			</Container>
		)
	}
}

LoginScreen.navigationOptions = {
	header: null
}

LoginScreen.propTypes = {
	navigation: PropTypes.object
}

export default LoginScreen