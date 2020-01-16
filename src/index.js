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
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <App />
                {/* <Route exact path="/" component={App} /> */}
                {/* <Route component={() => (<div>404 Not found </div>)} /> */}
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// https://zhuanlan.zhihu.com/p/52559555
// https://pjchender.blogspot.com/2018/11/react-react-router-dynamic-breadcrumb.html
// https://medium.com/@yystartup/%E7%94%A8-github-pages-%E8%A3%BD%E4%BD%9C-react-demo-site-7840fcb9cc33
// https://medium.com/@Dragonza/react-router-problem-with-gh-pages-c93a5e243819

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
