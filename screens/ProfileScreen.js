import AppHeader from "../components/AppHeader"
import CatGrid from "../components/CatGrid"
import Colors from "../constants/Colors"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"
import { style } from "./styles/ProfileScreen"
import { fetchUser, getCurrentUser, login, register } from "@redux/actions/profile"
import {
	ActivityIndicator,
	AsyncStorage,
	Dimensions,
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableHighlight,
	View
} from "react-native"
import { Container, H1, H2, Text, Toast } from "native-base"
import { Avatar, Button, Icon, Image } from "react-native-elements"

const width = Dimensions.get("window").width - 20

const styles = StyleSheet.create(style)

class ProfileScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: "",
			forgotPassword: false,
			imgIndex: 0,
			loginForm: true,
			modalVisible: false,
			name: "",
			password: "",
			registrationForm: false,
			showToast: false,
			username: ""
		}
	}

	async componentDidMount() {
		let userId = ""
		try {
			userId = (await AsyncStorage.getItem("userId")) || null
		} catch (error) {
			console.log(error.message)
		}

		if (userId) {
			this.props.fetchUser({ id: userId })
		}
	}

	submitLoginForm(email, password) {
		if (email !== "" && password !== "") {
			this.props.login({ email, password })
		}
	}

	submitRegistrationForm(email, name, password, username) {
		if (email === "") {
			Toast.show({
				buttonText: "Okay",
				duration: 3000,
				text: "Please enter a valid email address",
				type: "danger"
			})
		}

		if (password.length < 7) {
			Toast.show({
				buttonText: "Okay",
				duration: 3000,
				text: "You must enter your password",
				type: "danger"
			})
		}

		if (email !== "" && password.length > 6 && name.length > 1 && username.length > 1) {
			this.props.register({ email, name, password, username })
		}
	}

	render() {
		const {
			email,
			forgotPassword,
			imgIndex,
			loginForm,
			modalVisible,
			name,
			password,
			registrationForm,
			username
		} = this.state
		const { catImages, cats, catCount, user, userId } = this.props
		console.log("profile screen")
		console.log(this.props)
		console.log(imgIndex)

		const SubmitFormButton = ({ callback, text }) => {
			return <Button onPress={() => callback()} style={styles.formSubmitBtn} title={text} />
		}

		const ForgotPassword = (
			<Container style={styles.formContainer}>
				<TextInput
					onChange={e => {
						this.setState({ email: e.nativeEvent.text })
					}}
					placeholder="Enter your email"
					style={styles.textInput}
					value={email}
				/>
				<SubmitFormButton
					callback={() => this.submitLoginForm(email, password)}
					text="Send"
				/>
				<Text
					onPress={() => {
						this.setState({
							forgotPassword: false,
							loginForm: true,
							registrationForm: false
						})
					}}
					style={styles.formSubText}
				>
					Cancel
				</Text>
			</Container>
		)

		const LoginForm = (
			<View style={styles.formContainer}>
				<TextInput
					onChange={e => {
						this.setState({ email: e.nativeEvent.text })
					}}
					placeholder="Email or username"
					style={styles.textInput}
					value={email}
				/>
				<TextInput
					onChange={e => {
						this.setState({ password: e.nativeEvent.text })
					}}
					placeholder="Password"
					secureTextEntry
					style={styles.textInput}
					value={password}
				/>
				<SubmitFormButton
					callback={() => this.submitLoginForm(email, password)}
					text="Sign In"
				/>
				<Text
					onPress={() => {
						this.setState({
							forgotPassword: true,
							loginForm: false,
							registrationForm: false
						})
					}}
					style={styles.formSubText}
				>
					Forgot password?
				</Text>
				<Text
					onPress={() => {
						this.setState({
							forgotPassword: false,
							loginForm: false,
							registrationForm: true
						})
					}}
					style={styles.formSubText}
				>
					Sign Up
				</Text>
			</View>
		)

		const RegistrationForm = (
			<Container style={styles.formContainer}>
				<TextInput
					onChange={e => {
						this.setState({ name: e.nativeEvent.text })
					}}
					placeholder="Name"
					style={styles.textInput}
					value={name}
				/>
				<TextInput
					onChange={e => {
						this.setState({ username: e.nativeEvent.text })
					}}
					placeholder="Username"
					style={styles.textInput}
					value={username}
				/>
				<TextInput
					onChange={e => {
						this.setState({ email: e.nativeEvent.text })
					}}
					placeholder="Email"
					style={styles.textInput}
					value={email}
				/>
				<TextInput
					onChange={e => {
						this.setState({ password: e.nativeEvent.text })
					}}
					placeholder="Password"
					secureTextEntry
					style={styles.textInput}
					value={password}
				/>
				<SubmitFormButton
					callback={() => this.submitRegistrationForm(email, name, password, username)}
					text="Sign Up"
				/>
				<Text
					onPress={() => {
						this.setState({
							forgotPassword: false,
							loginForm: true,
							registrationForm: false
						})
					}}
					style={styles.formSubText}
				>
					Sign In
				</Text>
			</Container>
		)

		return (
			<Container>
				<AppHeader
					left={() => null}
					right={() => <Icon color={Colors.white} name="cog" onPress={() => null} type="font-awesome" />}
					title="Profile"
				/>
				{userId === null ? (
					<Container style={styles.container}>
						{forgotPassword && ForgotPassword}
						{loginForm && LoginForm}
						{registrationForm && RegistrationForm}
					</Container>
				) : (
					<ScrollView>
						{this.props.user.id ? (
							<View>
								<View style={styles.imageWrapper}>
									<Avatar rounded icon={{ name: 'home' }} size="large" />
								</View>
								<H1 style={styles.h1}>{user.name}</H1>
								<Text style={styles.usernameText}>{user.username}</Text>

								<H2 style={styles.myCatsH2}>My Cats</H2>
								<CatGrid cats={cats} catImages={catImages} user={user} />
							</View>
						) : (
							<ActivityIndicator />
						)}
					</ScrollView>
				)}
			</Container>
		)
	}
}

ProfileScreen.navigationOptions = {
	header: null
}

ProfileScreen.propTypes = {
	catCount: PropTypes.number,
	catImages: PropTypes.array,
	cats: PropTypes.array,
	fetchUser: PropTypes.func,
	getCurrentUser: PropTypes.func,
	login: PropTypes.func,
	register: PropTypes.func,
	user: PropTypes.object,
	userId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
}

ProfileScreen.defaultProps = {
	fetchUser,
	getCurrentUser,
	login,
	register,
	user: {
		dateCreated: null,
		id: null,
		img: null,
		name: null,
		pushNotificationsEnabled: true,
		verificationCode: null
	},
	userId: null
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
		fetchUser,
		getCurrentUser,
		login,
		register
	}
)(ProfileScreen)
