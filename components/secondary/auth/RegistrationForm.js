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

class RegistrationForm extends Component {
	constructor(props) {
		super(props)

		const { navigate } = this.props.navigation
		this.navigate = navigate

		this.state = {
			email: "",
			name: "",
			password: "",
			username: ""
		}
	}

	async checkUsername(username) {
		const response = await fetch(
			`http://localhost:8888/cats/api/users/checkUsername?username=${username}`,
			{
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
		const json = await response.json()
		return json
	}

	submitRegistrationForm(email, name, password, username) {
		this.props.register({
			email,
			name,
			navigate: this.navigate,
			password,
			username
		})
	}

	render() {
		const { email, name, password, username } = this.state

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
					autoCapitalize="words"
					label="Name"
					onChangeText={name => {
						this.setState({ name })
					}}
					style={styles.textInput}
					value={name}
				/>
				<TextField
					autoCapitalize="none"
					label="Username"
					onChangeText={username => {
						this.setState({ username })
					}}
					style={styles.textInput}
					value={username}
				/>
				<TextField
					autoCapitalize="none"
					autoCompleteType="email"
					keyboardType="email-address"
					label="Email"
					onChangeText={email => {
						this.setState({ email })
					}}
					style={styles.textInput}
					value={email}
				/>
				<TextField
					label="Password"
					onChangeText={password => {
						this.setState({ password })
					}}
					secureTextEntry
					style={styles.textInput}
					value={password}
				/>
				<SubmitFormButton
					callback={() => this.submitRegistrationForm(email, name, password, username)}
					text="Sign Up"
				/>
				<StyledText
					onPress={() => {
						this.props.toggleRegistrationForm()
					}}
					style={styles.formSubText}
					text="Sign In"
				/>
			</Container>
		)

		return <Container>{MainForm}</Container>
	}
}

RegistrationForm.propTypes = {
	navigation: PropTypes.object,
	register: PropTypes.func,
	toggleRegistrationForm: PropTypes.func
}

RegistrationForm.defaultProps = {
	register
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
		register
	}
)(RegistrationForm)