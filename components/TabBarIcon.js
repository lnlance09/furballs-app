import React from "react"
import { Ionicons } from "@expo/vector-icons"

export default function TabBarIcon(props) {
	return <Ionicons color={props.color} name={props.name} size={props.size} style={props.style} />
}
