import { combineReducers } from "redux"
import activity from "./activity"
import app from "./app"
import capture from "./capture"
import map from "./map"
import profile from "./profile"
import search from "./search"

export default combineReducers({
	activity,
	app,
	capture,
	map,
	profile,
	search
})
