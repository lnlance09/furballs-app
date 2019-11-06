import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import reducers from "@redux/reducers/"

const initialState = {}
const middleware = [thunk]
const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
