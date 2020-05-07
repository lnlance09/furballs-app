import * as Permissions from "expo-permissions"
import { style } from "./styles/CameraRoll"
import { connect } from "react-redux"
import { CameraRoll, Dimensions, Image, StyleSheet, TouchableHighlight, View } from "react-native"
import { Icon } from "react-native-elements"
import { FlatGrid } from "react-native-super-grid"
import AppHeader from "@components/primary/AppHeader"
import CameraRollComponent from "@components/primary/CameraRoll"
import Colors from "@constants/Colors"
import PropTypes from "prop-types"
import React, { Component } from "react"

const { width } = Dimensions.get("window")

const styles = StyleSheet.create(style)

class CameraRollScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {
			hasCameraRollPermission: false,
			hasMore: false,
			isLoading: false,
			isRefreshing: false,
			page: 0,
			photos: [],
			seed: 0
		}
	}

	async componentDidMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
		this.setState(
			{
				hasCameraRollPermission: status === "granted"
			},
			() => {
				this.getPhotos()
			}
		)
	}

	getPhotos() {
		CameraRoll.getPhotos({
			assetType: "Photos",
			first: 20
		})
			.then(r => {
				this.setState({ photos: r.edges })
			})
			.catch(err => console.error(err))
	}

	handleLoadMore() {
		if (this.state.hasMore) {
			this.setState(
				{
					page: this.state.page + 1
				},
				() => {
					this.getPhotos()
				}
			)
		}
	}

	handleRefresh() {
		this.setState(
			{
				isRefreshing: true,
				page: 0,
				seed: this.state.seed + 1
			},
			() => {
				this.getPhotos()
			}
		)
	}

	render() {
		const { hasCameraRollPermission, isRefreshing, photos } = this.state
		const { navigate } = this.props.navigation

		return (
			<View style={styles.cameraView}>
				<AppHeader
					left={() => (
						<Icon
							color={Colors.black}
							name="arrow-back"
							onPress={() => {
								this.props.navigation.goBack()
							}}
						/>
					)}
					right={() => null}
					title="Pick a photo"
				/>
				<View style={styles.listContainer}>
					<CameraRollComponent navigate={navigate} />
				</View>
			</View>
		)
	}
}

CameraRollScreen.navigationOptions = {
	header: null
}

CameraRollScreen.propTypes = {
	navigation: PropTypes.object
}

CameraRollScreen.defaultProps = {}

const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps
	}
}

export default connect(
	mapStateToProps,
	{}
)(CameraRollScreen)