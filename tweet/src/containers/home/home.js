import React, { useState, useEffect } from "react";

import axios from 'axios';
import { SERVER_ENDPOINT } from '../../constant';

export default function Home(props) {

    const [tweets, setTweets] = useState();

    useEffect(() => {
        axios
            .get(`${SERVER_ENDPOINT}/tweet/getAll`)
            .then(({ data }) => {
                setTweets(data);
            });
    }, []);



    return (
        <div className="card">
            <div className="card-body">
                <ul>
                    {tweets.map(tweet => (
                        <li key={tweet.tweetid}>
                            <div><h3>{tweet.title}</h3></div>
                            <div><h4>{tweet.createdon}</h4></div>
                            <div><p>{tweet.description}</p></div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}