require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.post('/', async (req, res) => {
  const prompt = req.body.prompt;

  const { ChatGPTAPI } = await import('chatgpt');
  // sessionToken is required; see below for details
  const api = new ChatGPTAPI({
    sessionToken: process.env.SESSION_TOKEN
  });

  // ensure the API is properly authenticated
  await api.ensureAuth();

  // send a message and wait for the response
  const response = await api.sendMessage(prompt);

  // send a response with the body
  res.send(response);
});

app.listen(3001);
