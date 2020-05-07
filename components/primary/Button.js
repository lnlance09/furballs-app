import { style } from "./styles/Button"
import { StyleSheet } from "react-native"
import { Button } from "native-base"
import PropTypes from "prop-types"
import React, { Component } from "react"
import StyledText from "@components/primary/StyledText"

const styles = StyleSheet.create(style)

class ButtonComponent extends Component {
	render() {
		const { buttonStyle, onPress, text, textStyle } = this.props

		return (
			<Button
				block
				onPress={() => onPress()}
				style={[styles.button, buttonStyle]}
			>
				<StyledText
					style={[styles.text, textStyle]}
					text={text}
				/>
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