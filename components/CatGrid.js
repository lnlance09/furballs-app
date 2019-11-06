import PropTypes from "prop-types"
import React, { Component } from "react"
import { style } from "./styles/CatGrid"
import ImageViewer from "react-native-image-zoom-viewer"
import {
	Dimensions,
	Image,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TouchableHighlight,
	View
} from "react-native"
import { Icon } from "react-native-elements"
import { FlatGrid } from "react-native-super-grid"

const { width } = Dimensions.get("window")

const styles = StyleSheet.create(style)

class CatGrid extends Component {
	constructor(props) {
		super(props)

		this.state = {
			imgIndex: 0,
			modalVisible: false
		}
	}

	render() {
		const { imgIndex, modalVisible } = this.state
		const { cats, catImages, user } = this.props

		return (
			<ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
				{cats.length > 0 ? (
					<View style={styles.listContainer}>
						<FlatGrid
							// itemDimension={(width / 3)-5}
							items={cats}
							renderItem={({ item, index }) => (
								<TouchableHighlight
									onPress={() =>
										this.setState({ imgIndex: index, modalVisible: true })
									}
								>
									<Image source={{ uri: item.url }} style={styles.gridImg} />
								</TouchableHighlight>
							)}
							spacing={2}
							style={styles.pictureGrid}
						/>

						<Modal transparent={true} visible={modalVisible}>
							<ImageViewer
								imageUrls={catImages.map(e => {
									return { url: e }
								})}
								index={imgIndex}
								renderHeader={() => (
									<TouchableHighlight
										onPressOut={() =>
											this.setState({ modalVisible: false })
										}
										underlayColor="transparent"
									>
										{modalVisible && (
											<Icon
												color="#fff"
												icon="times"
											/>
										)}
									</TouchableHighlight>
								)}
							/>
						</Modal>
					</View>
				) : (
					<Text style={styles.emptyMsg}>
						{user.name} does not have any pics yet
					</Text>
				)}
			</ScrollView>
		)
	}
}

CatGrid.propTypes = {
	cats: PropTypes.array,
	catImages: PropTypes.array,
	user: PropTypes.shape({
		name: PropTypes.string
	})
}

CatGrid.defaultProps = {
	cats: [],
	catImages: [],
}

export default CatGrid
