import PropTypes from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"
import { style } from "./styles/CatTiles"
import {
	FlatList,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
} from "react-native"
import { getCat, resetCat } from "@redux/actions/app"
import { fetchActivity, toggleCatTilesRefeshing } from "@redux/actions/activity"

const styles = StyleSheet.create(style)

class CatTiles extends Component {
	constructor(props) {
		super(props)

		this.state = {}

		this.onEndReachedCalledDuringMomentum = true

		this.nextPage = this.nextPage.bind(this)
	}

	componentDidMount() {
		this.props.fetchActivity({ page: 0 })
	}

	nextPage() {
		this.props.toggleCatTilesRefeshing()
		this.props.fetchActivity({ page: this.props.activityPage })
	}

	render() {
		const {
			activityCats,
			activityHasMore,
			activityPage,
			activityPages,
			activityRefreshing
		} = this.props

		return (
			activityCats.length > 0 && (
				<FlatList
					contentContainerStyle={styles.flatListContainer}
					data={activityCats}
					keyExtractor={item => item.id}
					onEndReached={() => {
						console.log("end reached")
						console.log(activityPage)
						console.log(activityPages)
						console.log(activityHasMore)
						if (
							activityPage < activityPages &&
							activityHasMore &&
							!activityRefreshing
						) {
							// console.log("fetching new page")
							this.nextPage()
						}
					}}
					onEndReachedThreshold={0.5}
					onRefresh={() => {
						this.props.toggleCatTilesRefeshing()
						this.props.fetchActivity({ page: 0 })
					}}
					refreshing={activityRefreshing}
					renderItem={({ item, index }) => (
						<TouchableWithoutFeedback
							onPress={() => {
								this.props.navigate("Cat", {
									id: item.id
								})
							}}
						>
							<ImageBackground
								source={{ uri: item.img }}
								key={`catTile${index}`}
								style={{ height: 200, width: "100%" }}
							>
								<Text style={styles.nameText}>{item.name}</Text>
							</ImageBackground>
						</TouchableWithoutFeedback>
					)}
				/>
			)
		)
	}
}

CatTiles.propTypes = {
	activityCats: PropTypes.array,
	activityHasMore: PropTypes.bool,
	activityPage: PropTypes.number,
	activityPages: PropTypes.number,
	activityRefreshing: PropTypes.bool,
	fetchActivity: PropTypes.func,
	getCat: PropTypes.func,
	navigate: PropTypes.func,
	resetCat: PropTypes.func,
	toggleCatTilesRefeshing: PropTypes.func
}

CatTiles.defaultProps = {
	activityCats: [],
	activityHasMore: false,
	activityPage: 0,
	activityRefreshing: false,
	fetchActivity,
	getCat,
	resetCat,
	toggleCatTilesRefeshing
}

const mapStateToProps = (state, ownProps) => {
	return {
		...state.app,
		...state.activity,
		...ownProps
	}
}

export default connect(
	mapStateToProps,
	{
		fetchActivity,
		getCat,
		resetCat,
		toggleCatTilesRefeshing
	}
)(CatTiles)
