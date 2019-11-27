import React, { useState, useEffect } from "react";

import axios from 'axios';
import { SERVER_ENDPOINT } from '../../constant';

import './home.css'

export default function Home(props) {

    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        // axios.get(`${SERVER_ENDPOINT}/auth/login-status`)
        // .then(({ data }) => {
        //     if(!data.auth_status){
        //         history.push('/');
        //     }
        // });
        axios
            .get(`${SERVER_ENDPOINT}/tweet/getAll`, { withCredentials: true })
            .then(({ data }) => {
                setTweets(data);
            });
    }, []);



    return (
        <div id="tweet">
            <ul>
                {
                    tweets.length == 0 ?
                        <div className="card">
                            <div className="card-body"><h1>No tweets</h1></div>
                        </div>
                        :
                        tweets.map(tweet => (
                            <li className="mt-2" key={tweet.tweetid}>
                                <div className="card">
                                    <div className="card-body">
                                        <div>
                                            <h3 className="text-success d-inline-block">{tweet.tweeter}</h3>
                                            <h6 className="ml-2 d-inline">{(new Date(tweet.createdon)).toLocaleString()}</h6>
                                        </div>
                                        <div><h4 className="text-primary">{tweet.tweettitle}</h4></div>
                                        <div><p>{tweet.description}</p></div>
                                    </div>
                                </div>
                            </li>
                        ))
                }
            </ul>
        </div>
    );
}