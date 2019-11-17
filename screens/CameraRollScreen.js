import * as Permissions from "expo-permissions"
import AppHeader from "../components/AppHeader"
import Colors from "../constants/Colors"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { style } from "./styles/CameraRollScreen"
import { connect } from "react-redux"
import { addCatPic } from "@redux/actions/capture"
import { CameraRoll, Dimensions, Image, StyleSheet, Text, TouchableHighlight, View } from "react-native"
import { Icon } from "react-native-elements"
import { FlatGrid } from "react-native-super-grid"

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
								navigate("Home")
							}}
						/>
					)}
					right={() => null}
					title="Pick a photo"
				/>
				<View style={styles.listContainer}>
					{photos.length > 0 && (
						<FlatGrid
							itemDimension={width / 3 - 20}
							items={photos}
							onEndReached={this.handleLoadMore}
							onEndThreshold={0}
							onRefresh={this.handleRefresh}
							refreshing={isRefreshing}
							renderItem={({ item, index }) => (
								<TouchableHighlight
									key={`${item.id}_${index}`}
									onPress={() => {
										return null
									}}
								>
									<Image source={{ uri: item.url }} style={styles.gridImg} />
								</TouchableHighlight>
							)}
							spacing={1}
							style={styles.pictureGrid}
						/>
					)}
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
