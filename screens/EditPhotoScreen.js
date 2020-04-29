import * as Location from "expo-location"
import AppHeader from "@components/primary/AppHeader"
import Colors from "@constants/Colors"
import PropTypes from "prop-types"
import Confetti from "react-native-confetti"
import store from "@store"
import Video from "expo-av"
import React, { Component } from "react"
import { style } from "./styles/EditPhotoScreen"
import { connect } from "react-redux"
import { addCatPic } from "@redux/actions/cat"
import { ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native"
import { Dropdown } from "react-native-material-dropdown"
import { TextField } from "react-native-material-textfield"
import { Icon } from "react-native-elements"

const styles = StyleSheet.create(style)

class EditPhotoScreen extends Component {
	constructor(props) {
		super(props)

		const { navigate } = this.props.navigation
		this.navigate = navigate

		this.state = {
			catType: "Stray cat",
			description: "",
			img: {},
			name: "",
			type: ""
		}
	}

	async componentDidMount() {
		const img = this.props.navigation.getParam("img", {})
		this.setState({ img })
	}

	async submitCat() {
		const location = await Location.getCurrentPositionAsync({})
		const lat = location.coords.latitude
		const lon = location.coords.longitude
		const img = this.state.img

		const _state = store.getState()
		const bearer = _state.user.token

		this.props.addCatPic({ bearer, img, lat, lon })
	}

	render() {
		const { description, img, name } = this.state

		return (
			<View style={styles.cameraView}>
				<AppHeader
					left={() => (
						<Icon
							color={Colors.white}
							name="arrow-back"
							onPress={() => {
								this.setState({ img: null })
							}}
						/>
					)}
					right={() => (
						<Text
							onPress={() => {
								if (description.trim() === "") {
									return
								}

								if (img === "") {
									return
								}

								if (name.trim() === "") {
									return
								}

								this.navigate("CatTypeSelection", {
									description,
									img,
									name
								})
							}}
						>
							Next
						</Text>
					)}
					title="Deets"
				/>
				{img.uri && (
					<ImageBackground
						source={{
							uri: img.uri
						}}
						style={styles.imgBackground}
					/>
				)}
				<ScrollView style={{ marginHorizontal: 7 }}>
					<TextField
						autoCompleteType="name"
						label="Give this furball a name"
						onChangeText={name => {
							this.setState({ name })
						}}
						style={styles.textInput}
						value={name}
					/>
					<TextField
						characterRestriction={320}
						label="How would you describe this furball?"
						multiline={true}
						numberOfLines={4}
						onChangeText={description => {
							this.setState({ description })
						}}
						value={description}
					/>
				</ScrollView>
				<Confetti ref={node => (this._confettiView = node)} />
			</View>
		)
	}
}

EditPhotoScreen.navigationOptions = {
	header: null
}

EditPhotoScreen.propTypes = {
	addCatPic: PropTypes.func,
	navigation: PropTypes.object
}

EditPhotoScreen.defaultProps = {
	addCatPic
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
		addCatPic
	}
)(EditPhotoScreen)