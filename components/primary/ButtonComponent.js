import PropTypes from "prop-types"
import React, { Component } from "react"
import { Button } from "native-base"
import { StyleSheet, Text } from "react-native"
import { style } from "./styles/Button"

const styles = StyleSheet.create(style)

class ButtonComponent extends Component {
	render() {
		const { buttonStyle, onPress, text, textStyle } = this.props

		return (
			<Button block onPress={() => onPress()} style={[styles.button, buttonStyle]}>
				<Text style={[styles.text, textStyle]}>{text}</Text>
			</Button>
		)
	}
}

ButtonComponent.propTypes = {
	buttonStyle: PropTypes.object,
	onPress: PropTypes.func,
	text: PropTypes.string,
	textStyle: PropTypes.object
}

ButtonComponent.defaultProps = {
	onPress: () => null
}

export default ButtonComponent
