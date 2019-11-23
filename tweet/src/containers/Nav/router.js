import React from "react";
import ReactDOM from "react-dom";
import {
    Route
} from "react-router-dom";

import Home from '../home/home';
import Timeline from '../timeline/timeline';

export default function RouterPaths(props) {
    return (
        <div>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/timeline">
                <Timeline />
            </Route>
            {/* <Route path="/news">
                    <NewsFeed />
                </Route> */}
        </div>
    );
}