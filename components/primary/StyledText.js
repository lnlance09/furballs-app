import { Text } from "react-native"
import PropTypes from "prop-types"
import React, { Component } from "react"

class StyledText extends Component {
	render() {
		const { onPress, style, text } = this.props

		return (
			<Text
				onPress={() => onPress()}
				style={[style, { fontFamily: "century-gothic" }]}
			>
				{text}
			</Text>
		)
	}
}

StyledText.propTypes = {
	onPress: PropTypes.func,
	style: PropTypes.object,
	text: PropTypes.string
}

StyledText.defaultProps = {
	onPress: () => null
}

export default StyledText