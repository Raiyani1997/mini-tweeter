import React from 'react';
import logo from './logo.svg';
import './App.css';
import { SERVER_ENDPOINT } from './constant';
import axios from 'axios';

import Login from './containers/login/login';
import Nav from './containers/Nav/nav';

function App() {
  return (
    <div className="container-fluid">
      <div className="col-12 pt-5">
        <Nav />
      </div>
    </div>
  );
}

export default App;
