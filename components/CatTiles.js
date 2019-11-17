import * as constants from "@redux/types"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { style } from "./styles/CatTiles"
import { FlatList, ImageBackground, StyleSheet, Text, TouchableWithoutFeedback } from "react-native"

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
					renderItem={({ item, index }) => (
						<TouchableWithoutFeedback
							key={`catTile${index}`}
							onPress={() => {
								this.props.navigate("Cat", {
									id: item.id
								})
							}}
							style={{ height: 200, width: "100%" }}
						>
							<ImageBackground
								imageStyle={styles.imgBackgroundImage}
								source={{ uri: item.img }}
								style={styles.imgBackground}
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
	navigate: PropTypes.func
}

CatTiles.defaultProps = {}

export default CatTiles
