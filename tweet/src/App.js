import React from 'react';
import logo from './logo.svg';
import './App.css';
import { SERVER_ENDPOINT } from './constant';
import axios from 'axios';

import Login from './containers/login/login';
import Nav from './containers/Nav/nav';

async function checkIsAuthenticated(){
  return await axios.get(`${SERVER_ENDPOINT}/auth/login-status`);
}

function App() {
  return (
    <div className="container-fluid">
      <div className="col-12 pt-5">
        {
          checkIsAuthenticated() ?
          <div>
            <Nav/>
          </div>
           : 
          <div className="mx-auto form">
            <Login/>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
