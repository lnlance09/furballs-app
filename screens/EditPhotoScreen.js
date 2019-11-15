import * as Permissions from "expo-permissions"
import AppHeader from "../components/AppHeader"
import Colors from "../constants/Colors"
import PropTypes from "prop-types"
import Confetti from "react-native-confetti"
import React, { Component } from "react"
import { style } from "./styles/EditPhotoScreen"
import { connect } from "react-redux"
import { addCatPic } from "@redux/actions/capture"
import { ImageBackground, StyleSheet, Text, View } from "react-native"
import {
	TextField,
	FilledTextField,
	OutlinedTextField,
} from "react-native-material-textfield"
import { Icon } from "react-native-elements"

const styles = StyleSheet.create(style)

class EditPhotoScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {
			description: "",
			name: ""
		}
	}

	async componentDidMount() {
		
	}

	render() {
		const { description, name } = this.state
		const { navigate } = this.props.navigation

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
					right={() => null}
					title="Deets"
				/>
				<ImageBackground
					source={{
						uri:
							"https://pbs.twimg.com/profile_images/436232540299350016/SUO4-MhH_400x400.jpeg"
					}}
					style={{ height: 240, width: "100%" }}
				/>
				<View style={{ marginHorizontal: 7 }}>
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
						style={{
							// height: 150,
							// justifyContent: "flex-start"
						}}
						inputContainerStyle={{
							// height: 130,
							// justifyContent: "flex-start"
						}}
						value={description}
					/>
				</View>
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
		...state.capture,
		...ownProps
	}
}

export default connect(
	mapStateToProps,
	{
		addCatPic
	}
)(EditPhotoScreen)
