import React from "react";
import {
    Route,
    Redirect
} from "react-router-dom";

import axios from 'axios';
import { SERVER_ENDPOINT } from '../../constant';

import Home from '../home/home';
import Timeline from '../timeline/timeline';
import Login from '../login/login';

export default function RouterPaths(props) {
    async function authenticate() {
        let result = await axios.get(`${SERVER_ENDPOINT}/auth/login-status`).then(({ data }) => data.auth_status);
        return result;
    }
    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            authenticate()
                ? <Component {...props} />
                : <Redirect to='/login' />
        )} />
    )
    return (
        <div>
            <Route path="/login">
                <Login />
            </Route>
            <Route exact path="/" >
                <Redirect to="/login" />
            </Route>
            <PrivateRoute path='/timeline' component={Timeline} />
            <PrivateRoute path='/home' component={Home} />
            {/* <Route path="/timeline">
                <Timeline />
            </Route>
            <Route path="/home">
                <Home />
            </Route> */}
        </div>
    );
}