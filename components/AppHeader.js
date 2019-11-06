import Colors from "../constants/Colors"
import { style } from "./styles/AppHeader"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { Body, Header, Left, Right, Title } from "native-base"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create(style)

class AppHeader extends Component {
	render() {
		const { left, right, title } = this.props

		return (
			<Header style={styles.header}>
				{left && <Left>{left()}</Left>}

				<Body>
					<Title style={styles.title}>{title}</Title>
				</Body>

				{right && <Right>{right()}</Right>}
			</Header>
		)
	}
}

AppHeader.propTypes = {
	left: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
	right: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
	title: PropTypes.string
}

AppHeader.defaultProps = {
	left: false,
	right: false
}

export default AppHeader
