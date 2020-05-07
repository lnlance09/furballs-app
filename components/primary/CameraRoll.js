import * as Permissions from "expo-permissions"
import { style } from "./styles/CameraRoll"
import { CameraRoll, Dimensions, Image, StyleSheet, TouchableHighlight, View } from "react-native"
import { FlatGrid } from "react-native-super-grid"
import Colors from "@constants/Colors"
import PropTypes from "prop-types"
import React, { Component } from "react"

const { width } = Dimensions.get("window")

const styles = StyleSheet.create(style)

class CameraRollComponent extends Component {
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

		this.handleLoadMore = this.handleLoadMore.bind(this)
		this.handleRefresh = this.handleRefresh.bind(this)
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
			first: 72
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

		return (
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
								key={`${item.node.timestamp}_${index}`}
								onPress={() => {
									this.props.onSelectCallback(item.node.image)
								}}
							>
								<Image
									source={{ uri: item.node.image.uri }}
									style={styles.gridImg}
								/>
							</TouchableHighlight>
						)}
						spacing={0}
						style={styles.pictureGrid}
					/>
				)}
			</View>
		)
	}
}

CameraRollComponent.propTypes = {
	onSelectCallback: PropTypes.func
}

CameraRollComponent.defaultProps = {
	onSelectCallback: () => null
}

export default CameraRollComponent