import Carousel from "react-native-snap-carousel"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { ActivityIndicator, Image, StyleSheet, View } from "react-native"
import { style } from "./styles/Carousel"

const styles = StyleSheet.create(style)

class CarouselComponent extends Component {
	constructor(props) {
		super(props)

		this.state = {
			loaded: false,
		}
	}

	componentDidMount() {
		this.willFocusCatPage = this.props.navigation.addListener(
			"willFocus",
			() => {
				this.setState({ imgColor: this.props.imgColor, loaded: !this.state.loaded })
				// this._carousel.current.currentIndex = 0
			}
		)
	}

	componentWillUnmount() {
		this.willFocusCatPage.remove()
	}

	renderItem(data) {
		console.log("renderItem")
		console.log(data)
		return (
			<View style={{ padding: 7 }}>
				<Image
					loadingIndicatorSource={<ActivityIndicator />}
					source={{ uri: data.item.pic_path }}
					style={[this.props.imgColor, styles.carouselImg]}
				/>
			</View>
		)
	}

	render() {
		const { photos, width } = this.props

		return (
			<Carousel
				data={photos}
				itemWidth={width}
				ref={c => { this._carousel = c }}
				renderItem={item => this.renderItem(item)}
				sliderWidth={width}
			/>
		)
	}
}

CarouselComponent.propTypes = {
	imgColor: PropTypes.shape({
		borderColor: PropTypes.string
	}),
	navigation: PropTypes.object,
	photos: PropTypes.array,
	width: PropTypes.number
}

CarouselComponent.defaultProps = {
	
}

export default CarouselComponent
