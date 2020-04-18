import AppHeader from "@components/primary/AppHeader"
import ButtonComponent from "@components/primary/ButtonComponent"
import LoginForm from "@components/secondary/LoginForm"
import RegistrationForm from "@components/secondary/RegistrationForm"
import ResetPassForm from "@components/secondary/ResetPassForm"
import VerifyForm from "@components/secondary/VerifyForm"
import PropTypes from "prop-types"
import RegisterPic from "@assets/images/register.svg"
import store from "@store"
import React, { Component } from "react"
import { validateEmail } from "@tools/textFunctions"
import { connect } from "react-redux"
import { style } from "./styles/LoginScreen"
import { updateUser } from "@redux/actions/user"
import { Dimensions, StyleSheet, View } from "react-native"
import { TextField } from "react-native-material-textfield"
import { Container, Text, Toast } from "native-base"

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
