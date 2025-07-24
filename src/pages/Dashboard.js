import React, { useEffect, useState } from 'react';
import './dashboard.css';
import axios from 'axios';

const Dashboard = () => {
    const [quotes, setQuote] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://dummyjson.com/quotes');
                setQuote(response.data.request);
            }catch (err) {
                setError('Could not load quote.')
            }finally {
                setLoading(false);
            }
        };
        fetchQuote();
    }, []);

    if (loading) return <p>Loading quotes ....</p>;
    if (error) return <p className="dashboard-er">{error}</p>;

  return (
        <div className="dashboard-cont">
            <h1>Dashboard Page</h1>
            <ul className="dashboard-box">
                {quotes.map((quote) => (
                    <li className="dashboard-id" key={quote._id}>
                        <blockquote className="dashboard-text">"{quote.content}"</blockquote> 
                        <em className="dashboard-author"> {quote.author}</em>
                    </li>
                ))}
            </ul>
        </div>
  );
};

export default Dashboard;