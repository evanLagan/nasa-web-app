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

// Retrieving images from a specified date range
app.get('/api/apod-range', async (req, res) => {
  const { start_date, end_date } = req.query;
  console.log(NASA_KEY)
  try {
    const response = await axios.get(`https://api.nasa.gov/planetary/apod`, {
      params: {
        api_key: process.env.NASA_API_KEY,
        start_date,
        end_date,
      },
    });
    res.json(response.data); // This will be an array of APODs
    console.log(res);
  } catch (err) {
    console.error('APOD range error:', err);
    res.status(500).json({ error: 'Failed to fetch APOD range' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;