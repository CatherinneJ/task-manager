import React, { useEffect, useState } from 'react';
import './dashboard.css';
import axios from 'axios';
import usebackQuotes from '../assets/usebackQuotes.json';
import TaskList from '../components/TaskList';

const Dashboard = () => {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await axios.get('https://api.api-ninjas.com/v1/quotes', {
                    headers: {
                        'X-Api key': import.meta.env.VITE_API_KEY,
                    }
                });

                setQuotes(response.data);
            } catch (apiError) {
                console.warn("API failled, use useback quotes", apiError);
                try {
                    const useback = await import('../assets/usebackQuotes.json');
                    setQuotes(useback.default);
                } catch (jsonError) {
                    console.error('Useback JSON load failed:', jsonError)
                    setError('Could not loadi quotes.');
                }
            } finally {
                setLoading(false);
            };
        };

        fetchQuote();
    }, []);

    if (loading) return <p>Loading quotes ....</p>;
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