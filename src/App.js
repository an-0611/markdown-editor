import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import './App.css';

import PlusIcon from './common/svg/PlusIcon';
import Articles from './components/Articles';
import Article from './components/Article';

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <NavLink to="/" className="home">home</NavLink>
        <NavLink to="/create">
          <PlusIcon handleClick={() => { console.log(1); }}/>
        </NavLink>
      </header>
      <div className="App-body">
        <Switch>
          <Route path="/" exact component={Articles} />
          <Route path="/article/:id" component={Article} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
