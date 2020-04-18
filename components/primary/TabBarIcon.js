import PropTypes from "prop-types"
import React, { Component } from "react"
import { Ionicons } from "@expo/vector-icons"

class TabBarIcon extends Component {
	render() {
		const { color, name, size, style } = this.props

		return <Ionicons color={color} name={name} size={size} style={style} />
	}
}

TabBarIcon.propTypes = {
	color: PropTypes.string,
	name: PropTypes.string,
	size: PropTypes.number,
	style: PropTypes.object
}

TabBarIcon.defaultProps = {}

export default TabBarIcon
