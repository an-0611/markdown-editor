import React from 'react';
import { NavLink } from 'react-router-dom';
import PlusIcon from '../common/svg/PlusIcon';

function Nav() {
  return (
    <header className="App-header">
        <NavLink to="/" className="home">Markdown-editor</NavLink>
        <NavLink to="/create/">
            <PlusIcon />
        </NavLink>
    </header>
  );
}

export default Nav;
