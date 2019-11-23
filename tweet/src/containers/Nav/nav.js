import React, { useState } from "react";
import Routers from './router';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import axios from 'axios';
import { SERVER_ENDPOINT } from '../../constant';

import './nav.css';

export default function Nav(props) {

    async function logOut(event) {
        await axios.post(`${SERVER_ENDPOINT}/auth/logout`, { withCredentials: true });
        window.location.reload();
    }

    return (
        <Router>
            <div id="nav" className="shadow rounded" v-if="show">
                <div className="mt-1">
                    <ul className="menu primary-color">
                        <li><i class="fa fa-address-book"></i> My Mini Tweeter</li>
                    </ul>
                </div>
                <div className="mr-auto pl-1 pt-1">
                    <ul className="menu">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/timeline">Home</Link>
                        </li>
                    </ul>
                </div>
                <div className="ml-auto pr-4 pt-1">
                    <ul className="menu">
                        <li>
                            <i className="fa fa-sign-out pointer" aria-hidden="true" onClick={logOut}>Logout</i>
                        </li>
                    </ul>
                </div>
            </div>
            <div className>
                <Routers />
            </div>
        </Router>
    );
}