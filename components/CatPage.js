import Animated, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import mapStyle from "../mapStyle.json"
import AppHeader from "../components/AppHeader"
import Colors from "../constants/Colors"
import PropTypes from "prop-types"
import React, { Component } from "react"
import moment from "moment"
import { style } from "./styles/CatPage"
import { connect } from "react-redux"
import { RenderMeal } from "../tools/textFunctions"
import { getCat, resetCat, toggleCatPageEditing } from "@redux/actions/app"
import { Container, Tab, Tabs, TabHeading, Text } from "native-base"
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native"
import { Button, Icon, Image, ListItem } from "react-native-elements"
import { FlatGrid } from "react-native-super-grid"

const styles = StyleSheet.create(style)

class CatPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			fetching: false,
			page: 0,
			q: ""
		}

		this.feedCat = this.feedCat.bind(this)
		this.likeCat = this.likeCat.bind(this)
	}

	feedCat() {

	}

	likeCat() {

	}

	render() {
		const {
			description,
			editing,
			id,
			img,
			lastLocationTime,
			lat,
			lon,
			mealCount,
			name,
			picCount,
			region
		} = this.props

		const canEdit = true

		const RenderMeals = props => {
			return props.meals.map((m, i) => (
				<ListItem
					bottomDivider
					key={`mealListItem${i}`}
					subtitle={`${RenderMeal([m.meal_type])}  ${moment(lastLocationTime).fromNow()}`}
					title={null}
				/>
			))
		}

		const RenderPhotos = props => {
			return (
				<FlatGrid
					itemDimension={130}
					items={props.pics}
					renderItem={({ item }) => <Image source={{ uri: item.pic_path }} />}
					style={styles.gridView}
				/>
			)
		}

		return (
			<Container style={styles.cardPageContainer}>
				<AppHeader
					left={() => (
						<Icon
							color={Colors.white}
							name="arrow-back"
							onPress={() => {
								this.props.resetCat()
							}}
						/>
					)}
					right={() => {
						if (canEdit) {
							return (
								<Icon
									color={Colors.pink}
									name="heart"
									onPress={() => {
										
									}}
									type="font-awesome"
								/>
							)
						}
						return null
					}}
					title={name}
				/>

				<ScrollView>
					<View style={styles.cardPageSubView}>
						<Image
							Placeholder={<ActivityIndicator />}
							source={{ uri: img }}
							style={styles.cardPageImg}
						/>
						<Text style={styles.cardPageDescriptionText}>{description}</Text>

						<Animated
							customMapStyle={mapStyle}
							// onRegionChange={this.onRegionChange}
							provider={PROVIDER_GOOGLE}
							region={{
								latitude: lat,
								latitudeDelta: 0.0922,
								longitude: lon,
								longitudeDelta: 0.0421
							}}
							style={styles.map}
						>
							<Marker
								coordinate={{
									latitude: parseFloat(lat, 10),
									longitude: parseFloat(lon, 10)
								}}
							/>
						</Animated>
						<Text style={styles.spottedAtText}>
							🐾 Spotted {moment(lastLocationTime).fromNow()}
						</Text>
						<Text style={styles.spottedAtText}>
							🐾 Report animal abuse
						</Text>

						<View
							style={{
								// flexDirection: "row",
								// flexWrap: "wrap",
								marginTop: 10
							}}
						>
							<Button
								buttonStyle={styles.feedBtn}
								onPress={() => callback()}
								title="Feed this cat"
							/>
						</View>

						<Container style={styles.cardPageContainer}>
							<Tabs
								tabContainerStyle={styles.tabContainerStyle}
								tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
							>
								<Tab
									heading={
										<TabHeading style={styles.tabHeadingStyle}>
											<Text style={styles.tabHeadingTextStyle}>Sightings</Text>
										</TabHeading>
									}
								>
									{picCount > 0 ? (
										RenderPhotos(this.props)
									) : (
										<Text style={styles.emptyMsg}>
											This cat does not have any pics yet
										</Text>
									)}
								</Tab>
								<Tab
									heading={
										<TabHeading style={styles.tabHeadingStyle}>
											<Text style={styles.tabHeadingTextStyle}>Meals</Text>
										</TabHeading>
									}
								>
									{mealCount > 0 ? (
										RenderMeals(this.props)
									) : (
										<Text style={styles.emptyMsg}>
											This cat has not been fed yet
										</Text>
									)}
								</Tab>
							</Tabs>
						</Container>
					</View>
				</ScrollView>
			</Container>
		)
	}
}
CatPage.propTypes = {
	description: PropTypes.string,
	editing: PropTypes.bool,
	getCat: PropTypes.func,
	homeless: PropTypes.bool,
	id: PropTypes.string,
	img: PropTypes.string,
	lastLocationTime: PropTypes.string,
	lat: PropTypes.string,
	lon: PropTypes.string,
	mealCount: PropTypes.number,
	meals: PropTypes.array,
	name: PropTypes.string,
	pattern: PropTypes.string,
	pics: PropTypes.array,
	picCount: PropTypes.number,
	region: PropTypes.object,
	resetCat: PropTypes.func,
	toggleCatPageEditing: PropTypes.func
}

CatPage.defaultProps = {
	editing: false,
	id: null,
	getCat,
	region: {
		latitude: 40.7644,
		latitudeDelta: 0.0922,
		longitude: -73.9235,
		longitudeDelta: 0.0421
	},
	resetCat,
	toggleCatPageEditing
}
const mapStateToProps = (state, ownProps) => {
	return { ...state.app, ...ownProps }
}
export default connect(
	mapStateToProps,
	{ getCat, resetCat, toggleCatPageEditing }
)(CatPage)
