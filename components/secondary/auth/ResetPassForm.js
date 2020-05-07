import { style } from "./styles/LoginForm"
import { connect } from "react-redux"
import { validateEmail } from "@tools/textFunctions"
import { login } from "@redux/actions/user"
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
	}

	render() {
		const { email } = this.state

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
					label="Enter your email"
					onChangeText={email => {
						this.setState({ email })
					}}
					value={email}
				/>
				<SubmitFormButton callback={() => this.resetPassword(email)} text="Send" />
				<StyledText
					onPress={() => {
						this.props.toggleResetForm()
					}}
					style={styles.formSubText}
					text="Cancel"
				/>
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