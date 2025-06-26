import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/APODDetailPage.css';

const apiURL = process.env.REACT_APP_API_URL;

const APODDetailPage = () => {
    const { date } = useParams();
    const [data, setData] = useState(null);

    const navigate = useNavigate();

    const handleReturn = () => {
        navigate('/');
    }

    useEffect(() => {
        const loadAPOD = async () => {
            try {
                const res = await axios.get(`${apiURL}/api/apod?date=${date}`);
                setData(res.data);
            } catch (err) {
                console.error('Failed to fetch APOD details:', err);
            }
        };

        loadAPOD();
    }, [date]);

    if (!data) {
        return <div className="loading-message">Loading...</div>
    }

    return (
        <div className='apod-container'>
        <button className="back-button" onClick={handleReturn}>
            Back to Calendar
        </button>
        <div className="apod-detail-wrapper">
            <h2>{data.title}</h2>
            <p style={{ fontSize: '0.9rem', color: '#555'}}>
                📅 {data.date} {data.copyright && `| 📸 ${data.copyright}`}
            </p>
            <img src={data.url} alt={data.title} className="apod-image" />
            <p className="apod-explanation">{data.explanation}</p>
        </div>
        </div>
    );
};

export default APODDetailPage;