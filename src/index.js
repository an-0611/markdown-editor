import React from 'react';
import ReactDOM from 'react-dom';
import {
    // Router,
    // BrowserRouter,
    HashRouter,
} from 'react-router-dom';
import { Provider } from 'react-redux';
// import { createBrowserHistory } from 'history';

import './index.css';
import configureStore from './store/configureStore';
import App from './App';
import * as serviceWorker from './serviceWorker';

const client = {}
// const history = createBrowserHistory();
const history = {};
const preloadedState = window.INITIAL_STATE;
const store = configureStore(client, history, preloadedState);

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
