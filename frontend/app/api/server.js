const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/chatgpt', async (req, res) => {
    const { message } = req.body;
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
          max_tokens: 150,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      const chatResponse = response.data.choices[0].message.content;
      res.json({ reply: chatResponse });
    } catch (error) {
      console.error('Error communicating with OpenAI API:', error);
      res.status(500).json({ error: 'Failed to get response from ChatGPT' });
    }
  });

  app.post('/api/code', async (req, res) => {
    const { code } = req.body; 
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: `You are a code generator. Only answer in markdown code snippets. Use code comments for explanations if necessary: ${code}` }],
          max_tokens: 500,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      const codeResponse = response.data.choices[0].message.content;
      res.json({ code: codeResponse });  
    } catch (error) {
      console.error('Error communicating with OpenAI API:', error);
      res.status(500).json({ error: 'Failed to get response from ChatGPT' });
    }
});

app.post('/api/dalle', async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/images/generations',
            {
                model: "dall-e-3",
                prompt: prompt,
                n: 1,
                size: "1024x1024",
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.data && response.data.data && response.data.data[0]) {
            const imageUrl = response.data.data[0].url;
            res.json({ imageUrl });
        } else {
            throw new Error('Something is wrong with DALL-E');
        }
    } catch (error) {
        console.error('Error communicating with OpenAI DALL-E:', error.message);
        res.status(500).json({ error: 'Failed to generate image' });
    }
});

  app.listen(port, () => {
    console.log("Server running on " + port);
  });

