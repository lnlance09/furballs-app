import * as constants from "@redux/types"
import { style } from "./styles/CatTiles"
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Colors from "@constants/Colors"
import PropTypes from "prop-types"
import StyledText from "@components/primary/StyledText"
import React, { Component } from "react"

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
	}

	componentDidMount() {
		this.getActivity()
	}

	handleLoadMore = () => {
		console.log("handleLoadMore")
		// console.log(this.state)
		const { hasMore, page } = this.state
		if (hasMore) {
			this.setState(
				{
					page: page + 1
				},
				() => {
					this.getActivity()
				}
			)
		}
	}

	handleRefresh = () => {
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

	getActivity = () => {
		const { cats, page } = this.state
		this.setState({ isLoading: true }, () => {
			fetch(`${constants.BASE_URL}api/cats/browse?page=${page}`, {
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(response => {
					// console.log("cats response")
					// console.log(response.json())
					return response.json()
				})
				.then(json => {
					console.log("json")
					console.log(json)
					/*
					this.setState({
						cats: page === 0 ? json.cats : [...cats, ...json.cats],
						hasMore: json.hasMore,
						isRefreshing: false
					})
					*/
				})
				.catch(error => {
					console.error(error)
				})
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
						let borderColor = Colors.strayCat
						let marginTop = 25

						if (index > 0) {
							marginTop = 25
						}

						if (parseInt(item.living_situation, 10) === 1) {
							borderColor = Colors.businessCat
						}

						if (parseInt(item.living_situation, 10) === 2) {
							borderColor = Colors.familyCat
						}

						const imgStyle = { borderColor, marginTop }

						return (
							<View
								key={`catTile${index}`}
							>
								<TouchableOpacity
									onPress={() => {
										this.props.navigate("Cat", {
											id: item.id
										})
									}}
								>
									<Image
										source={{ uri: item.path }}
										style={[imgStyle, styles.imgBackground]}
									/>
								</TouchableOpacity>
								<Text
									style={styles.catTileHeader}
								>
									{item.name}
								</Text>
							</View>
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