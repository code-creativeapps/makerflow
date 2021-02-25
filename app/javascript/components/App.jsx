import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Dashboard from './Dashboard';
import rootReducer from "./reducers"

const store = createStore(rootReducer, applyMiddleware(thunk))

const App = () => (
    <Provider store={store}>
        <Dashboard />
    </Provider>
)

export default App