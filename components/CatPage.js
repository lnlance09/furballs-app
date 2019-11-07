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
import { getCat, likeCat, resetCat, toggleCatPageEditing, unlikeCat } from "@redux/actions/app"
import { Container, Tab, Tabs, TabHeading, Text } from "native-base"
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native"
import { Button, Icon, Image, ListItem } from "react-native-elements"
import { FlatGrid } from "react-native-super-grid"

const styles = StyleSheet.create(style)

class CatPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			reportLayoutVisible: false
		}

		this.feedCat = this.feedCat.bind(this)
		this.likeCat = this.likeCat.bind(this)
		this.reportAbuse = this.reportAbuse.bind(this)
		this.unlikeCat = this.unlikeCat.bind(this)
	}

	feedCat() {
		console.log("feed cat")
		this.setState({ reportLayoutVisible: true})
	}

	likeCat(id) {
		console.log("like cat")
		this.props.likeCat({ id })
	}

	reportAbuse() {

	}

	unlikeCat(id) {
		console.log("like cat")
		this.props.unlikeCat({ id })
	}

	render() {
		const {
			description,
			editing,
			id,
			img,
			lastLocationTime,
			lat,
			likedByMe,
			lon,
			mealCount,
			name,
			picCount,
			region
		} = this.props

		const { reportLayoutVisible } = this.state

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
						if (likedByMe) {
							return (
								<Text
									onPress={() => this.unlikeCat(this.props.id)}
									style={{ color: Colors.white }}
								>
									Liked
								</Text>
							)
						}

						return (
							<Icon
								color={Colors.pink}
								name="heart"
								onPress={() => this.likeCat(this.props.id)}
								type="font-awesome"
							/>
						)
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
							🚩 Report animal abuse
						</Text>

						<View
							style={{ marginTop: 10 }}
						>
							<Button
								buttonStyle={styles.feedBtn}
								onPress={() => this.feedCat()}
								title="Feed this cat"
							/>
						</View>

						<Container style={styles.cardPageContainer}>
							<Tabs
								tabContainerStyle={styles.tabBarContainerStyle}
								tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
							>
								<Tab
									heading={
										<TabHeading style={styles.tabHeading}>
											<Text style={styles.tabText}>Sightings</Text>
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
										<TabHeading style={styles.tabHeading}>
											<Text style={styles.tabText}>Meals</Text>
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
	likeCat: PropTypes.func,
	likeCount: PropTypes.number,
	likedByMe: PropTypes.bool,
	lon: PropTypes.string,
	mealCount: PropTypes.number,
	meals: PropTypes.array,
	name: PropTypes.string,
	pattern: PropTypes.string,
	pics: PropTypes.array,
	picCount: PropTypes.number,
	region: PropTypes.object,
	resetCat: PropTypes.func,
	toggleCatPageEditing: PropTypes.func,
	unlikeCat: PropTypes.func,
}

CatPage.defaultProps = {
	editing: false,
	id: null,
	getCat,
	likeCat,
	likedByMe: false,
	region: {
		latitude: 40.7644,
		latitudeDelta: 0.0922,
		longitude: -73.9235,
		longitudeDelta: 0.0421
	},
	resetCat,
	toggleCatPageEditing,
	unlikeCat
}
const mapStateToProps = (state, ownProps) => {
	return { ...state.app, ...ownProps }
}
export default connect(
	mapStateToProps,
	{ getCat, likeCat, resetCat, toggleCatPageEditing, unlikeCat }
)(CatPage)
