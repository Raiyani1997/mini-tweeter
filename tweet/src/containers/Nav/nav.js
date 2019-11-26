import React, { useState } from "react";
import Routers from './router';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import axios from 'axios';
import { SERVER_ENDPOINT } from '../../constant';

import './nav.css';
import history from '../../history';

export default function Nav(props) {

    async function logOut(event) {
        await axios.post(`${SERVER_ENDPOINT}/auth/logout`, { withCredentials: true });
        history.push('/');
        window.location.reload(false);
    }

    return (

        <Router history={history}>
            {
                !window.location.href.includes("/login") ? 
                    <div id="nav" className="shadow rounded" v-if="show">
                        <div className="mt-1">
                            <ul className="menu primary-color">
                                <li><i class="fa fa-twitter"></i> My Mini Tweeter</li>
                            </ul>
                        </div>
                        <div className="mr-auto pl-1 pt-1">
                            <ul className="menu">
                                <li>
                                    <Link to="/home">Home</Link>
                                </li>
                                <li>
                                    <Link to="/timeline">MyTimeLine</Link>
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
                :
                null

            }
            <div className="shadow rounded">
                <Routers />
            </div>
        </Router>

    );
}