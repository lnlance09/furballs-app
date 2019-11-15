import PropTypes from "prop-types"
import Colors from "../constants/Colors"
import React, { PureComponent } from "react"
import moment from "moment"
import { style } from "./styles/CatList"
import { connect } from "react-redux"
import { RenderMeal } from "../tools/textFunctions"
import { FlatList, StyleSheet, View } from "react-native"
import { getCat, resetCat } from "@redux/actions/app"
import { searchCats, toggleCatListRefeshing } from "@redux/actions/map"
import { ListItem, SearchBar } from "react-native-elements"

const styles = StyleSheet.create(style)

class CatList extends PureComponent {
	constructor(props) {
		super(props)

		this.state = {
			fetching: false,
			q: ""
		}

		this.onEndReachedCalledDuringMomentum = true

		this.nextPage = this.nextPage.bind(this)
		this.updateSearch = this.updateSearch.bind(this)
	}

	componentDidMount() {
		this.props.searchCats({ q: this.state.q, page: 0 })
	}

	nextPage() {
		this.props.toggleCatListRefeshing()
		this.props.searchCats({ q: this.state.q, page: this.props.listPage })
	}

	updateSearch(q) {
		this.setState({ q })
		this.props.searchCats({ q, page: 0 })
	}

	render() {
		const { q } = this.state
		const { listCats, listHasMore, listPage, listPages, listRefreshing } = this.props

		return (
			<View>
				<SearchBar
					containerStyle={styles.searchBarContainer}
					inputContainerStyle={styles.searchBarInputContainer}
					inputStyle={{ color: Colors.black }}
					lightTheme
					onChangeText={this.updateSearch}
					placeholder="Search furballs"
					value={q}
				/>
				<FlatList
					contentContainerStyle={styles.flatListContainer}
					data={listCats}
					keyExtractor={item => item.id}
					onEndReached={() => {
						console.log("end reached")
						console.log(listPage)
						console.log(listPages)
						console.log(listHasMore)
						if (listPage < listPages && listHasMore && !listRefreshing) {
							this.nextPage()
						}
					}}
					onEndReachedThreshold={0.5}
					onMomentumScrollBegin={() => {
						this.props.toggleCatListRefeshing()
					}}
					onRefresh={() => {
						this.props.toggleCatListRefeshing()
						this.props.searchCats({ q, page: 0 })
					}}
					refreshing={listRefreshing}
					renderItem={({ item, index }) => (
						<ListItem
							bottomDivider
							chevron
							key={`ListItem${index}`}
							leftAvatar={{ source: { uri: item.img } }}
							onPress={() => {
								this.props.navigate("Cat", {
									id: item.id
								})
							}}
							subtitle={
								item.food_type === null
									? ""
									: `${RenderMeal([item.food_type])} fed ${moment(
										item.food_date
									).fromNow()}`
							}
							title={item.name}
						/>
					)}
				/>
			</View>
		)
	}
}

CatList.propTypes = {
	getCat: PropTypes.func,
	listCats: PropTypes.array,
	listHasMore: PropTypes.bool,
	listPage: PropTypes.number,
	listPages: PropTypes.number,
	listRefreshing: PropTypes.bool,
	nextPage: PropTypes.func,
	navigate: PropTypes.func,
	q: PropTypes.string,
	searchCats: PropTypes.func,
	toggleCatListRefeshing: PropTypes.func,
	useFooter: PropTypes.bool,
	useImg: PropTypes.bool
}

CatList.defaultProps = {
	getCat,
	listCats: [],
	listHasMore: false,
	listPage: 0,
	listRefreshing: false,
	q: "",
	searchCats,
	toggleCatListRefeshing,
	useFooter: true,
	useImg: true
}

const mapStateToProps = (state, ownProps) => {
	return {
		...state.app,
		...state.map,
		...ownProps
	}
}

export default connect(
	mapStateToProps,
	{
		getCat,
		resetCat,
		searchCats,
		toggleCatListRefeshing
	}
)(CatList)
