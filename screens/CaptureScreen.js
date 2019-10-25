import PropTypes from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"
import { addCatPic } from "../actions/capture"
import { Text, View, TouchableOpacity } from "react-native"
import * as Permissions from "expo-permissions"
import { Camera } from "expo-camera"

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
				<View style={{ flex: 1 }}>
					<Camera
						ref={ref => {
							this.camera = ref
						}}
						style={{ flex: 1 }}
						type={this.state.type}
					>
						<View
							style={{
								backgroundColor: "transparent",
								flex: 1,
								flexDirection: "row"
							}}
						>
							<TouchableOpacity
								onPress={() => {
									this.setState({
										type:
											type === Camera.Constants.Type.back
												? Camera.Constants.Type.front
												: Camera.Constants.Type.back
									})
								}}
								style={{
									alignItems: "center",
									alignSelf: "flex-end",
									flex: 0.1
								}}
							>
								<Text
									onPress={this.takePicture.bind(this)}
									style={{
										color: "white",
										fontSize: 18,
										marginBottom: 10
									}}
								>
									Flip
								</Text>
							</TouchableOpacity>
						</View>
					</Camera>
				</View>
			)
		}
	}
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
