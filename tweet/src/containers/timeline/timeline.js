import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios';
import { SERVER_ENDPOINT } from '../../constant';

import './timeline.css';

export default function TimeLine(props) {

    const [tweets, setTweets] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function validateForm() {
        return title.length > 0 && description.length > 0 && description.length < 140;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const tweetData = {
            title: title,
            description
        }
        await axios.post(`${SERVER_ENDPOINT}/tweet/create`, tweetData, { withCredentials: true });
    }

    useEffect(() => {
        axios
            .get(`${SERVER_ENDPOINT}/tweet/getMy`)
            .then(({ data }) => {
                setTweets(data);
            });
    }, []);



    return (
        <div className="card">
            <div className="card-body" id = "tweet">
                <ul>
                    <li>
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <FormGroup controlId="title" bsSize="large">
                                        <FormLabel>Title</FormLabel>
                                        <FormControl
                                            autoFocus
                                            type="text"
                                            value={title}
                                            onChange={e => setTitle(e.target.value)}
                                        />
                                    </FormGroup>
                                    <FormGroup controlId="description" bsSize="large">
                                        <FormLabel>Description</FormLabel>
                                        <FormControl
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                            type="text"
                                        />
                                    </FormGroup>
                                    <Button variant="success" bsSize="large" disabled={!validateForm()} type="submit">
                                        Tweet
                            </Button>
                                </form>
                            </div>
                        </div>
                    </li>
                    {
                        tweets.length == 0 ?
                            <div className="card mt-2">
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
                            ))}
                </ul>
            </div>
        </div>
    );
}