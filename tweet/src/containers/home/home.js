import React, { useState, useEffect } from "react";

import axios from 'axios';
import { SERVER_ENDPOINT } from '../../constant';

import './home.css'

export default function Home(props) {

    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        axios.get(`${SERVER_ENDPOINT}/auth/login-status`)
        .then(({ data }) => {
            console.log(data);
            
        });
        axios
            .get(`${SERVER_ENDPOINT}/tweet/getAll`)
            .then(({ data }) => {
                setTweets(data);
            });
    }, []);



    return (
        <div className="card">
            <div className="card-body" id = "tweet">
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
                                            <div><h3>{tweet.title}</h3></div>
                                            <div><h4>{tweet.createdon}</h4></div>
                                            <div><p>{tweet.description}</p></div>
                                        </div>
                                    </div>
                                </li>
                            ))
                    }
                </ul>
            </div>
        </div>
    );
}