import React from "react"
import { Platform, Text } from "react-native"
import { Card } from "react-native-elements"
import TabBarIcon from "./TabBarIcon"

export function CatCard(props) {
	return (
		<Card
			containerStyle={{
				marginHorizontal: 0,
				width: "100%"
			}}
			image={{ uri: props.img }}
		>
			<Text style={{ fontSize: 24 }}>{props.name}</Text>
			<Text style={{ marginBottom: 10, marginTop: 8 }}>{props.description}</Text>
			<Text>
				<TabBarIcon
					color="#08f"
					name={Platform.OS === "ios" ? "ios-navigate" : "md-navigate"}
					size={15}
					style={{
						marginLeft: 19
					}}
				/>{" "}
				{props.lat}, {props.lon}
			</Text>
		</Card>
	)
}
