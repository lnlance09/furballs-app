import { combineReducers } from "redux"
import activity from "./activity"
import capture from "./capture"
import map from "./map"
import profile from "./profile"
import search from "./search"

export default combineReducers({
	activity,
	capture,
	map,
	profile,
	search
})
