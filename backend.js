const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const HEYGEN_API_KEY = 'NDliZDIzNTAzYjBkNGQ1Mzk2OTI2ZmNjYzExZWViMDUtMTc0MjczODgzOA=='; // Replace this

app.post('/start-session', async (req, res) => {
  try {
    const session = await axios.post(
      'https://api.heygen.com/v1/streaming.new',
      { avatar_id: 'June_HR_public', quality: 'high' },
      { headers: { Authorization: `Bearer ${HEYGEN_API_KEY}` } }
    );

    const sessionId = session.data.data.session_id;

    const start = await axios.post(
      'https://api.heygen.com/v1/streaming.start',
      { session_id: sessionId },
      { headers: { Authorization: `Bearer ${HEYGEN_API_KEY}` } }
    );

    res.json({ ...start.data.data, session_id: sessionId });
  } catch (e) {
    console.error(e.response?.data || e.message);
    res.status(500).send('Failed to start session');
  }
});

app.listen(3001, () => console.log('HeyGen backend listening on port 3001'));
