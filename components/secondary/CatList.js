import * as constants from "@redux/types"
import PropTypes from "prop-types"
import moment from "moment"
import React, { Component } from "react"
import { style } from "./styles/CatList"
import { RenderMeal } from "@tools/textFunctions"
import { FlatList, StyleSheet, View } from "react-native"
import { ListItem, SearchBar } from "react-native-elements"

const styles = StyleSheet.create(style)

class CatList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			cats: [],
			hasMore: false,
			isLoading: false,
			isRefreshing: false,
			page: 0,
			q: "",
			seed: 0
		}

		this.handleLoadMore = this.handleLoadMore.bind(this)
		this.handleRefresh = this.handleRefresh.bind(this)
		this.updateSearch = this.updateSearch.bind(this)
	}

	componentDidMount() {
		this.searchCats()
	}

	handleLoadMore() {
		if (this.state.hasMore) {
			this.setState(
				{
					page: this.state.page + 1
				},
				() => {
					this.searchCats()
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
				this.searchCats()
			}
		)
	}

	searchCats() {
		const { cats, page, q } = this.state
		this.setState({ isLoading: true })

		fetch(`${constants.BASE_URL}api/cats/browse?q=${q}&page=${page}`, {
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(json => {
				this.setState({
					cats: page === 0 ? json.cats : [...cats, ...json.cats],
					hasMore: json.hasMore,
					isRefreshing: false
				})
			})
			.catch(error => {
				console.error(error)
			})
	}

	updateSearch(q) {
		this.setState({ page: 0, q }, () => this.searchCats())
	}

	render() {
		const { cats, isRefreshing, q } = this.state

		return (
			<View>
				<SearchBar
					containerStyle={styles.searchBarContainer}
					inputContainerStyle={styles.searchBarInputContainer}
					inputStyle={styles.searchBarInput}
					lightTheme
					onChangeText={this.updateSearch}
					placeholder="Search furballs"
					value={q}
				/>
				{cats.length > 0 && (
					<FlatList
						contentContainerStyle={styles.flatListContainer}
						data={cats}
						keyExtractor={item => item.id}
						onEndReached={this.handleLoadMore}
						onEndThreshold={0}
						onRefresh={this.handleRefresh}
						refreshing={isRefreshing}
						renderItem={({ item, index }) => (
							<ListItem
								bottomDivider
								chevron
								key={`ListItem${index}`}
								leftAvatar={{ source: { uri: item.path } }}
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
				)}
			</View>
		)
	}
}

CatList.propTypes = {
	navigate: PropTypes.func
}

CatList.defaultProps = {}

export default CatList
