import React, { useEffect, useState } from 'react';
import './dashboard.css';
import axios from 'axios';
import usebackQuotes from '../assets/usebackQuotes.json';
import TaskList from '../components/TaskList';

const Dashboard = () => {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchQuotes = async () => {
        try {
            const request = () => axios.get('https://api.api-ninjas.com/v1/quotes', {
                headers: {
                    'X-Api-Key': 'FJwtsJC4IYUUi5bDtIC2dw==LgXkDfQKL8qe1yxo',
                }
            });
            const responses = await Promise.all([request(), request(), request(), request(), request()]);
            setQuotes(responses.map(response => response.data[0]));
        } catch (apiError) {
            alert("API failed, check your internet connection or try again later.");
        } finally {
            setLoading(false);
        };
    };


    useEffect(() => {
        fetchQuotes();
    }, []);

    if (loading) return <p style={{ color: 'white' }}>Loading quotes ....</p>;
    if (error) return <p className='dashboard-er'>{error}</p>;


    return (
        <div className="dashboard-cont">
            <h1>Dashboard Page</h1>
            <ul className="dashboard-box">
                {quotes.slice(0, 5).map((quote, index) => (
                    <li className="dashboard-id" key={index}>
                        <blockquote className="dashboard-text">"{quote.quote}"</blockquote>
                        <em className="dashboard-author">{quote.author}</em>
                    </li>
                ))}
            </ul>
            <br />
            <TaskList />
        </div>
    );
};

export default Dashboard;