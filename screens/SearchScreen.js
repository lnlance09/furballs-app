import PropTypes from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"
import { searchCats } from "../actions/search"
import {
	FlatList,
	ScrollView,
	StyleSheet,
	View
} from "react-native"
import { SearchBar } from "react-native-elements"
import { CatCard } from "../components/CatCard"

class SearchScreen extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			page: 0,
			q: ""
		}
	}

	componentDidMount() {
		this.props.searchCats({ q: "", page: 0 })
	}

	updateSearch(q) {
		this.setState({ q })
		this.props.searchCats({ q, page: this.state.page })
	}

	render() {
		const { q } = this.state

		const styles = StyleSheet.create({
			container: {
				backgroundColor: "#fff",
				flex: 1
			}
		})

		return (
			<View style={styles.container}>
				<SearchBar
					lightTheme
					onChangeText={this.updateSearch}
					placeholder="Search furballs"
					value={q}
				/>
				<ScrollView>
					<FlatList
						data={this.props.cats}
						keyExtractor={item => item.id}
						renderItem={({ item }) => (
							<CatCard
								description={item.description}
								img={item.img}
								lat={item.lat}
								lon={item.lon}
								name={item.name}
							/>
						)}
						style={{ width: "100%" }}
					/>
				</ScrollView>
			</View>
		)
	}
}

SearchScreen.navigationOptions = {
	title: "Search furballs"
}

SearchScreen.propTypes = {
	cats: PropTypes.array,
	searchCats: PropTypes.func
}

SearchScreen.defaultProps = {
	cats: [],
	searchCats
}

const mapStateToProps = (state, ownProps) => {
	return {
		...state.search,
		...ownProps
	}
}

export default connect(
	mapStateToProps,
	{
		searchCats
	}
)(SearchScreen)
