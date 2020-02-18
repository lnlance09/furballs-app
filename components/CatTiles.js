import * as constants from "@redux/types"
import Colors from "../constants/Colors"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { style } from "./styles/CatTiles"
import { FlatList, Image, StyleSheet, TouchableWithoutFeedback } from "react-native"

const styles = StyleSheet.create(style)

class CatTiles extends Component {
	constructor(props) {
		super(props)

		this.state = {
			cats: [],
			hasMore: false,
			isLoading: false,
			isRefreshing: false,
			page: 0,
			seed: 0
		}

		this.getActivity = this.getActivity.bind(this)
		this.handleLoadMore = this.handleLoadMore.bind(this)
		this.handleRefresh = this.handleRefresh.bind(this)
	}

	componentDidMount() {
		this.getActivity()
	}

	handleLoadMore() {
		if (this.state.hasMore) {
			this.setState(
				{
					page: this.state.page + 1
				},
				() => {
					this.getActivity()
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
				this.getActivity()
			}
		)
	}

	getActivity() {
		const { cats, page } = this.state
		this.setState({ isLoading: true })

		fetch(`${constants.BASE_URL}api/cats/browse?page=${page}`, {
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

	render() {
		const { cats, isRefreshing } = this.state

		return (
			cats.length > 0 && (
				<FlatList
					contentContainerStyle={styles.flatListContainer}
					data={cats}
					keyExtractor={item => item.id}
					onEndReached={this.handleLoadMore}
					onEndThreshold={0}
					onRefresh={this.handleRefresh}
					refreshing={isRefreshing}
					renderItem={({ item, index }) => {
						console.log(parseInt(item.living_situation, 10))
						let borderColor = Colors.strayCat
						if (parseInt(item.living_situation, 10) === 1) {
							borderColor = Colors.businessCat
						}
						if (parseInt(item.living_situation, 10) === 2) {
							borderColor = Colors.familyCat
						}
						const imgStyle = { borderColor }

						return (
							<TouchableWithoutFeedback
								key={`catTile${index}`}
								onPress={() => {
									this.props.navigate("Cat", {
										id: item.id
									})
								}}
								style={styles.imgBackground}
							>
								<Image
									source={{ uri: item.path }}
									style={[imgStyle, styles.imgBackground]}
								/>
							</TouchableWithoutFeedback>
						)
					}}
				/>
			)
		)
	}
}

CatTiles.propTypes = {
	navigate: PropTypes.func
}

CatTiles.defaultProps = {}

export default CatTiles
