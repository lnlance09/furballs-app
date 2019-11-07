import * as Permissions from "expo-permissions"
import CatPage from "../components/CatPage"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { style } from "./styles/CaptureScreen"
import { connect } from "react-redux"
import { addCatPic } from "@redux/actions/capture"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Camera } from "expo-camera"

const styles = StyleSheet.create(style)

class CaptureScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {
			hasCameraPermission: false,
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

				this.props.addCatPic({ img: data })
			})
		}
	}

	render() {
		const { hasCameraPermission, type } = this.state

		if (hasCameraPermission === null) {
			return <View />
		} else if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>
		} else {
			return (
				<View style={styles.cameraView}>
					<Camera
						ref={ref => {
							this.camera = ref
						}}
						style={styles.cameraView}
						type={this.state.type}
					>
						<View style={styles.cameraTouchableOpacity}>
							<TouchableOpacity
								onPress={() => {
									this.setState({
										type:
											type === Camera.Constants.Type.back
												? Camera.Constants.Type.front
												: Camera.Constants.Type.back
									})
								}}
								style={styles.cameraTouchableOpacity}
							>
								<Text
									onPress={this.takePicture.bind(this)}
									style={styles.takePicText}
								>
									Take Pic
								</Text>
							</TouchableOpacity>
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
	addCatPic: PropTypes.func
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
