import { combineReducers } from "redux"
import app from "./app"
import capture from "./capture"
import map from "./map"
import profile from "./profile"
import search from "./search"

export default combineReducers({
	app,
	capture,
	map,
	profile,
	search
})
