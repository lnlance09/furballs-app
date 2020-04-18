import PropTypes from "prop-types"
import React, { Component } from "react"
import { Text } from "react-native"

class MonoText extends Component {
	render() {
		return <Text style={[this.props.style, { fontFamily: "space-mono" }]} {...this.props} />
	}
}

MonoText.propTypes = {
	style: PropTypes.object
}

MonoText.defaultProps = {}

export default MonoText
