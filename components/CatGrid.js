import PropTypes from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"
import { style } from "./styles/CatGrid"
import { getLikedCats, toggleCatGridRefeshing } from "@redux/actions/profile"
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
console.log("flat grid")
console.log((width / 3)-5)
const styles = StyleSheet.create(style)

class CatGrid extends Component {
	constructor(props) {
		super(props)

		this.state = {}

		this.nextPage = this.nextPage.bind(this)
	}

	componentDidMount() {
		this.props.getLikedCats({ id: this.props.user.id })
	}

	nextPage() {
		this.props.toggleCatGridRefeshing()
		this.props.getLikedCats({
			id: this.props.user.id,
			page: this.props.gridPage
		})
	}

	render() {
		const { gridCats, navigate, user } = this.props

		return (
			gridCats.length > 0 ? (
				<View style={styles.listContainer}>
					<FlatGrid
						itemDimension={(width / 3)-20}
						items={gridCats}
						renderItem={({ item, index }) => (
							<TouchableHighlight
								onPress={() => {
									navigate("Cat", {
										id: item.id
									})
								}}
							>
								<Image
									source={{ uri: item.url }}
									style={styles.gridImg}
								/>
							</TouchableHighlight>
						)}
						spacing={1}
						style={styles.pictureGrid}
					/>
				</View>
			) : (
				<Text style={styles.emptyMsg}>{user.name} has not liked any cats</Text>
			)
		)
	}
}

CatGrid.propTypes = {
	getLikedCats: PropTypes.func,
	gridCats: PropTypes.array,
	gridHasMore: PropTypes.bool,
	gridPage: PropTypes.number,
	gridRefreshing: PropTypes.bool,
	navigate: PropTypes.func,
	toggleCatGridRefeshing: PropTypes.func,
	user: PropTypes.shape({
		id: PropTypes.string,
		name: PropTypes.string
	})
}

CatGrid.defaultProps = {
	getLikedCats,
	gridCats: [],
	gridHasMore: false,
	gridPage: 0,
	gridRefreshing: false,
	toggleCatGridRefeshing,
	user: {
		id: null
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		...state.app,
		...state.profile,
		...ownProps
	}
}

export default connect(
	mapStateToProps,
	{
		getLikedCats,
		toggleCatGridRefeshing
	}
)(CatGrid)
