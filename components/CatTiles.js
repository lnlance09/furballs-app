import PropTypes from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"
import { style } from "./styles/CatTiles"
import {
	Dimensions,
	FlatList,
	ScrollView,
	StyleSheet,
	View
} from "react-native"
import { getCat, resetCat } from "@redux/actions/app"
import { fetchActivity, toggleCatTilesRefeshing } from "@redux/actions/activity"
import { Tile } from "react-native-elements"

const { width } = Dimensions.get("window")

const styles = StyleSheet.create(style)

class CatTiles extends Component {
	constructor(props) {
		super(props)

		this.state = {
			page: 0
		}

		this.nextPage = this.nextPage.bind(this)
	}

	componentDidMount() {
		this.props.fetchActivity({ page: 0 })
	}

	nextPage() {
		this.props.toggleCatTilesRefeshing()
		this.props.fetchActivity({ page: this.props.page })
	}

	render() {
		const { activityCats, activityHasMore, activityPage, activityPages, activityRefreshing } = this.props

		return (
			<ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
				<View style={styles.listContainer}>
					{activityCats.length > 0 && (
						<FlatList
							contentContainerStyle={styles.flatListContainer}
							data={activityCats}
							keyExtractor={item => item.id}
							onEndReached={() => {
								console.log("end reached")
								if (activityPage < activityPages && activityHasMore && !activityRefreshing) {
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
								<Tile
									caption={item.description}
									containerStyle={{
										marginTop: 6
									}}
									featured
									imageSrc={{ uri: item.img }}
									key={`catTile${index}`}
									onPress={() => {
										this.props.getCat({ id: item.id })
									}}
									title={item.name}
									width={width}
							/>
							)}
							style={styles.flatList}
						/>
					)}
				</View>
			</ScrollView>
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
