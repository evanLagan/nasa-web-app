const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const NASA_KEY = process.env.NASA_API_KEY;

app.get('/api/apod', async (req, res) => {
    try {
        const {date} = req.query;
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}&date=${date}`);
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch APOD data'});
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;