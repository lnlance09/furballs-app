import * as constants from "@redux/types"
import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { setUserData } from "@redux/actions/user"
import { AsyncStorage } from "react-native"
import Amplify, { Auth } from "aws-amplify"
import thunk from "redux-thunk"
import reducers from "@redux/reducers/"

const getAsyncStorage = () => {
	return dispatch => {
		AsyncStorage.getItem("user").then(result => {
			const user = JSON.parse(result)
			AsyncStorage.getItem("token").then(token => {
				console.log("store")
				console.log(token)
				dispatch(setUserData({ token, user }))
			})
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
