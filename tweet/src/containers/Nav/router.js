import React from "react";
import ReactDOM from "react-dom";
import {
    Route,
    Redirect
} from "react-router-dom";

import Home from '../home/home';
import Timeline from '../timeline/timeline';
import Login from '../login/login';

export default function RouterPaths(props) {
    return (
        <div>
            <Route path="/login">
                <Login />
            </Route>
            <Route exact path="/" >
                <Redirect to="/login" />
            </Route>
            <Route path="/timeline">
                <Timeline />
            </Route>
            <Route path="/home">
                <Home />
            </Route>
        </div>
    );
}