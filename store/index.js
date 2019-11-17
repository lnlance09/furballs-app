import * as constants from "@redux/types"
import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { AsyncStorage } from "react-native"
import thunk from "redux-thunk"
import reducers from "@redux/reducers/"

const setInitialUserData = result => {
	return {
		type: constants.SET_INITIAL_USER_DATA,
		user: JSON.parse(result)
	}
}

const getAsyncStorage = () => {
	return dispatch => {
		AsyncStorage.getItem("user").then(result => {
			dispatch(setInitialUserData(result))
		})
	}
}

const initialState = {}
const middleware = [thunk]
const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

store.dispatch(getAsyncStorage())

export default store
