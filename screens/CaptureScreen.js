import * as Permissions from "expo-permissions"
import AppHeader from "../components/AppHeader"
import Colors from "../constants/Colors"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { style } from "./styles/CaptureScreen"
import { connect } from "react-redux"
import { addCatPic } from "@redux/actions/capture"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Icon } from "react-native-elements"
import { Camera } from "expo-camera"

const styles = StyleSheet.create(style)

class CaptureScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {
			hasCameraPermission: false,
			img: null,
			type: Camera.Constants.Type.back
		}
	}

	async componentDidMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA)
		this.setState({
			hasCameraPermission: status === "granted"
		})
	}

	async takePicture() {
		console.log("take pic")
		if (this.camera) {
			this.camera.takePictureAsync().then(async data => {
				console.log("take pic")
				console.log(data)
				const cropdata = {
					offset: {
						x: 0,
						y: 0
					},
					size: {
						height: 100,
						width: 100
					}
				}
				console.log(cropdata)

				this.setState({ img: data.uri }, () => {
					this.props.addCatPic({ img: data })

					const { navigate } = this.props.navigation
					navigate("EditPhoto")

					if (this._confettiView) {
						this._confettiView.startConfetti()
					}
				})
			})
		}
	}

	render() {
		const { hasCameraPermission, type } = this.state
		const { navigate } = this.props.navigation

		if (hasCameraPermission === null) {
			return <View></View>
		} else if (hasCameraPermission === false) {
			return <Text></Text>
		} else {
			return (
				<View style={styles.cameraView}>
					<AppHeader
						left={() => (
							<Icon
								color={Colors.black}
								name="arrow-back"
								onPress={() => {
									navigate("Home")
								}}
							/>
						)}
						right={() => null}
						title=""
					/>
					<Camera
						ref={ref => {
							this.camera = ref
						}}
						style={styles.cameraView}
						type={type}
					>
						<View style={styles.cameraTouchableOpacity}>
							<TouchableOpacity
								style={styles.cameraTouchableOpacity}
							></TouchableOpacity>
						</View>
						<View style={styles.cameraOptions}>
							<Icon
								color={Colors.red}
								name="camera"
								onPress={this.takePicture.bind(this)}
								raised
								reverse
								size={40}
								type="font-awesome"
							/>
						</View>
					</Camera>
				</View>
			)
		}
	}
}

CaptureScreen.navigationOptions = {
	header: null
}

CaptureScreen.propTypes = {
	addCatPic: PropTypes.func,
	navigation: PropTypes.object
}

CaptureScreen.defaultProps = {
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
)(CaptureScreen)
