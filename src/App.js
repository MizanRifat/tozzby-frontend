import React from "react"
import ReactDOM from 'react-dom';
import Routes from "./Routes";
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import { reducers } from "./Components/Redux/Reducer";

const store = createStore(
    reducers,
    applyMiddleware(thunk),
)


export default function App() {
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    )
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
