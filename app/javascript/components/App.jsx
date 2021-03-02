import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import Dashboard from './Dashboard';
import rootReducer from "./reducers"

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

const App = ({userToken}) => (
    <Provider store={store}>
        <Dashboard userToken={userToken}/>
    </Provider>
)

export default App