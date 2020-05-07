import * as constants from "@redux/types"
import { style } from "./styles/CatGrid"
import { Dimensions, Image, StyleSheet, Text, TouchableHighlight, View } from "react-native"
import { FlatGrid } from "react-native-super-grid"
import PropTypes from "prop-types"
import React, { Component } from "react"

const { width } = Dimensions.get("window")

const styles = StyleSheet.create(style)

class CatGrid extends Component {
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
		this.getCats()
		this.willFocusCatGrid = this.props.navigation.addListener("willFocus", () => {
			this.getCats()
		})
	}

	componentWillUnmount() {
		this.willFocusCatGrid.remove()
	}

	getCats = () => {
		const { cats, page } = this.state
		this.setState({ isLoading: true })

		fetch(`${constants.BASE_URL}api/users/getLikedCats?id=${this.props.user.id}&page=${page}`, {
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				return response.json()
			})
			.then(json => {
				this.setState({
					cats: page === 0 ? json.cats : [...cats, ...json.cats],
					hasMore: json.hasMore,
					isLoading: false
				})
			})
			.catch(error => {
				console.error(error)
			})
	}

	handleLoadMore = () => {
		if (this.state.hasMore) {
			this.setState(
				{
					page: this.state.page + 1
				},
				() => {
					this.getCats()
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
				this.getCats()
			}
		)
	}

	render() {
		const { cats, isRefreshing } = this.state
		const { user } = this.props
		const { navigate } = this.props.navigation

		return cats.length > 0 ? (
			<View style={styles.listContainer}>
				<FlatGrid
					items={cats}
					onEndReached={this.handleLoadMore}
					onEndThreshold={0}
					onRefresh={this.handleRefresh}
					refreshing={isRefreshing}
					renderItem={({ item, index }) => (
						<TouchableHighlight
							key={`${item.id}_${index}`}
							onPress={() => {
								navigate("Cat", {
									id: item.id
								})
							}}
						>
							<Image source={{ uri: item.path }} style={styles.gridImg} />
						</TouchableHighlight>
					)}
					spacing={0}
					style={styles.pictureGrid}
				/>
			</View>
		) : (
			<Text style={styles.emptyMsg}>{user.name} has not liked any cats</Text>
		)
	}
}

CatGrid.propTypes = {
	navigation: PropTypes.object,
	user: PropTypes.shape({
		id: PropTypes.string,
		name: PropTypes.string
	})
}

CatGrid.defaultProps = {
	user: {
		id: null
	}
}

export default CatGrid