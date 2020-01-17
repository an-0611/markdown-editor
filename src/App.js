import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import './App.css';

import PlusIcon from './common/svg/PlusIcon';
import Articles from './components/Articles';
import Article from './components/Article';
import Create from './components/Create';
import Page404 from './components/Page404';

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <NavLink to="/" className="home">home3</NavLink>
        <NavLink to="/create/">
          <PlusIcon handleClick={() => { console.log(1); }}/>
        </NavLink>
      </header>
      <div className="App-body">
        <Switch>
            <Route exact path="/" component={Articles} />
            <Route path="/article/:id" component={Article} />
            <Route path="/create/" component={Create} />
            <Route path="/404/" component={Page404} />
        </Switch>
        {/* <Switch> */}
          {/* <Route path="/" exact component={Articles} /> */}
          {/* <Route path="/article/:id" component={Article} /> */}
        {/* </Switch> */}
      </div>
    </div>
  );
}

export default App;
