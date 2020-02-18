import * as Permissions from "expo-permissions"
import AppHeader from "../components/AppHeader"
import ButtonComponent from "../components/ButtonComponent"
import CameraRollComponent from "../components/CameraRollComponent"
import Colors from "../constants/Colors"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { style } from "./styles/CaptureScreen"
import { connect } from "react-redux"
import { addCatPic } from "@redux/actions/app"
import { Container, Tab, TabHeading, Tabs, Text } from "native-base"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Icon } from "react-native-elements"
import { Camera } from "expo-camera"

const styles = StyleSheet.create(style)

class CaptureScreen extends Component {
	constructor(props) {
		super(props)

		const { navigate } = this.props.navigation
		this.navigate = navigate

		this.state = {
			hasCameraPermission: false,
			img: null,
			index: 0,
			recording: false,
			routes: [
				{ key: "camera", title: "Camera" },
				{ key: "library", title: "Library" }
			],
			showHeader: false,
			type: Camera.Constants.Type.back
		}

		this.startRecording = this.startRecording.bind(this)
		this.stopRecording = this.stopRecording.bind(this)
	}

	async componentDidMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA)
		const showHeader = this.props.navigation.getParam("showHeader", false)
		this.setState({
			hasCameraPermission: status === "granted",
			showHeader
		})
	}

	async toggleCameraPermission() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA)
		this.setState({
			hasCameraPermission: status === "granted"
		})
	}

	async toggleCameraRollPermission(on) {
		if (on) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
			this.setState({
				hasCameraRollPermission: status === "granted"
			})
		} else {
			this.setState({ hasCameraRollPermission: false })
		}
	}

	async startRecording() {
		if (this.video) {
			console.log("start recording")
			this.setState({ recording: true }, async () => {
				const video = await this.video.recordAsync()
				this.setState({ video })
				self.navigate("EditPhoto", {
					video
				})
			})
		}
	}

	stopRecording() {
		let self = this
		// const { video } = this.state
		this.setState({ recording: false }, () => {
			self.video.stopRecording()
			// const { video } = this.state
			// self.navigate("EditPhoto", {
			//	video
			// })
		})
	}

	async takePicture() {
		if (this.camera) {
			this.camera.takePictureAsync().then(async data => {
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

				this.setState({ img: data.uri }, () => {
					console.log("cat pic")
					console.log(data)
					this.navigate("EditPhoto", {
						img: data
					})

					/*
					if (this._confettiView) {
						this._confettiView.startConfetti()
					}
					*/
				})
			})
		}
	}

	render() {
		const { hasCameraPermission, index, recording, showHeader, type } = this.state
		const { navigate } = this.props.navigation
		const displayHeader = showHeader || index === 1
		const headerTitle = index === 0 ? "Take a picture" : "Pick a photo"
		console.log("hasCameraPermission")
		console.log(hasCameraPermission)
		console.log(index)

		const CameraView = (
			<View style={styles.cameraView}>
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
						/>
					</View>
					<View style={styles.cameraOptions}>
						<Icon
							color={Colors.red}
							name="camera"
							onPress={this.takePicture.bind(this)}
							reverse
							size={35}
							type="font-awesome"
						/>
					</View>
				</Camera>
			</View>
		)

		const VideoView = (
			<View style={styles.cameraView}>
				<Camera
					ref={ref => {
						this.video = ref
					}}
					style={styles.cameraView}
					type={type}
				>
					<View style={styles.cameraTouchableOpacity}>
						<TouchableOpacity
							style={styles.cameraTouchableOpacity}
						/>
					</View>
					<View style={styles.cameraOptions}>
						{recording ? (
							<Icon
								color={Colors.blue}
								name="videocam"
								onPress={this.stopRecording}
								reverse
								size={35}
							/>
						) : (
							<Icon
								color={Colors.red}
								name="videocam"
								onPress={this.startRecording}
								reverse
								size={35}
							/>
						)}
					</View>
					{recording && (
						<View style={{ backgroundColor: Colors.white }}>
							<Text style={{ fontStyle: "italic", textAlign: "center" }}>Recording...</Text>
						</View>
					)}
				</Camera>
			</View>
		)

		if (hasCameraPermission === null) {
			return (
				<View style={styles.permissionView}>
					<ButtonComponent
						buttonStyle={styles.permissionBtn}
						onPress={() => navigate("Capture")}
						text="Add cat photos"
						textStyle={styles.permissionBtnText}
					/>
				</View>
			)
		} else if (hasCameraPermission === false) {
			return (
				<View style={styles.permissionView}>
					<ButtonComponent
						buttonStyle={styles.permissionBtn}
						onPress={() => this.toggleCameraPermission()}
						text="Add cat photos"
						textStyle={styles.permissionBtnText}
					/>
				</View>
			)
		} else {
			return (
				<Container>
					<AppHeader
						left={() => {
							displayHeader && (
								<Icon
									color={Colors.black}
									name="arrow-back"
									onPress={() => {
										this.props.navigation.goBack()
									}}
								/>
							)
						}}
						right={() => null}
						title={headerTitle}
					/>
					<Tabs
						onChangeTab={data => this.setState({ index: data.i }) }
						tabBarPosition="bottom"
						tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
						tabContainerStyle={styles.tabBarContainerStyle}
					>
						<Tab
							heading={
								<TabHeading
									style={styles.tabHeading}
								>
									<Text style={styles.tabText}>Photo</Text>
								</TabHeading>
							}
						>
							{CameraView}
						</Tab>
						<Tab
							heading={
								<TabHeading
									style={styles.tabHeading}
								>
									<Text style={styles.tabText}>Library</Text>
								</TabHeading>
							}
						>
							<CameraRollComponent
								onSelectCallback={img => {
									this.navigate("EditPhoto", {
										img
									})
								}}
							/>
						</Tab>
					</Tabs>
				</Container>
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
		...state.app,
		...ownProps
	}
}

export default connect(
	mapStateToProps,
	{
		addCatPic
	}
)(CaptureScreen)
