import AppHeader from "../components/AppHeader"
import Colors from "../constants/Colors"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"
import { style } from "./styles/SearchScreen"
import { searchResources } from "@redux/actions/search"
import { Card, CardItem, Spinner, Text } from "native-base"
import { ActivityIndicator, Image, ScrollView, StyleSheet, View } from "react-native"

const styles = StyleSheet.create(style)

class SearchScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {}
	}

	componentDidMount() {
		this.props.searchResources({ city: "nyc", state: "new york" })
	}

	render() {
		const { resources } = this.props

		return (
			<View style={styles.container}>
				<AppHeader title="Local Resources" />
				{resources.length === 0 ? (
					<Spinner color={Colors.grey} style={styles.spinnerStyle} />
				) : (
					<ScrollView style={styles.scrollView}>
						{resources.map((item, index) => (
							<Card key={`resource${index}`} style={styles.cardContainer}>
								<CardItem cardBody>
									{item.photos && (
										<Image
											source={{
												uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.photos[0].photo_reference}&key=AIzaSyD0Hd-I0mmRVa3WxTy-lpNJ-xAyDqWWTxM`
											}}
											style={{ width: "100%", height: 120 }}
										/>
									)}
								</CardItem>
								<CardItem header>
									<Text>{item.name}</Text>
								</CardItem>
								<CardItem>
									<Text style={styles.catCardDescription}>
										{item.formatted_address}
									</Text>
								</CardItem>
							</Card>
						))}
					</ScrollView>
				)}
			</View>
		)
	}
}

SearchScreen.navigationOptions = {
	header: null
}

SearchScreen.propTypes = {
	resources: PropTypes.array,
	searchResources: PropTypes.func
}

SearchScreen.defaultProps = {
	resources: [],
	searchResources
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
		searchResources
	}
)(SearchScreen)
