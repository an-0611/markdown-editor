import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './assets/markdown.css';
import { GlobalStyle } from './GlobalStyle';

import Nav from './components/Nav';
import Articles from './containers/Articles';
import Article from './containers/Article';
import Create from './containers/Create';
import Page404 from './containers/Page404';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Nav />
      <div className="App-body">
        <Switch>
            <Route exact path="/" component={Articles} />
            <Route path="/article/:id" component={Article} />
            <Route path="/create/" component={Create} />
            <Route path="/404/" component={Page404} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
