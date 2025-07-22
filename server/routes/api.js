var express = require('express');
var router = express.Router();
const { getChatResponse } = require('../services/openaiService');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/chat', async function (req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const reply = await getChatResponse(message);
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong with OpenAI API' });
  }
});

module.exports = router;
