import * as constants from "@redux/types"
import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { getAsyncStorage, setUserData } from "@redux/actions/user"
import thunk from "redux-thunk"
import reducers from "@redux/reducers/"

const initialState = {}
const middleware = [thunk]
const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

store.dispatch(getAsyncStorage())

export default store