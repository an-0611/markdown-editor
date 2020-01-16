import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import configureStore from './store/configureStore';
import App from './App';
import * as serviceWorker from './serviceWorker';

const client = {}
const history = {}
const preloadedState = window.INITIAL_STATE;
const store = configureStore(client, history, preloadedState);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <App />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
