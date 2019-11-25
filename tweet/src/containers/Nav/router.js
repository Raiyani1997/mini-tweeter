import React from "react";
import ReactDOM from "react-dom";
import {
    Route
} from "react-router-dom";

import Home from '../home/home';
import Timeline from '../timeline/timeline';
import Login from '../login/login';

export default function RouterPaths(props) {
    return (
        <div>
            <Route exact path="/">
                <Login />
            </Route>
            <Route path="/timeline">
                <Timeline />
            </Route>
            <Route path="/home">
                <Home />
            </Route>
            {/* <Route path="/news">
                    <NewsFeed />
                </Route> */}
        </div>
    );
}