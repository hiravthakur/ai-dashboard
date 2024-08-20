const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const Replicate = require('replicate');
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


//an endpoint created to accomodate conversating with chatGPT
app.post('/api/chatgpt', async (req, res) => {
    const { message } = req.body;
  
    try {
      //send prompt to gpt 3.5
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
      
      //set reply to chatGPT's response
      const chatResponse = response.data.choices[0].message.content;
      res.json({ reply: chatResponse });
    } catch (error) {
      //error handling if something goes wrong
      console.error('Error communicating with OpenAI API:', error);
      res.status(500).json({ error: 'Failed to get response from ChatGPT' });
    }
  });

  //an endpoint created to accomodate generating code with chatGPT
  app.post('/api/code', async (req, res) => {
    const { code } = req.body; 
  
    try {
      //using gpt 3.5 again, trying to force it to only reply with code.
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

//an endpoint for generating images with DALL-E 3
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
        //check to see if there are multiple iterations of a generation provided
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

//an endpoint for generating music using Replicate
app.post('/api/music', async (req, res) => {
    const { prompt } = req.body;
    try {
      //code provided by Replicate, is basically the same as what was done for chatGPT
        const response = await replicate.run('riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05', {input: {
            prompt_a: prompt
        }

        });

        if (response && response.data.audio) {
            res.json({ musicUrl: response.data.audio });
        } else {
            throw new Error('Something is wrong with Replicate AI');
        }
    } catch (error) {
        console.error('Error communicating with Replicate AI', error.message);
        res.status(500).json({ error: 'Failed to generate music' });
    }
});

//an endpoint ffor generating videos using Replicate
app.post('/api/video', async (req, res) => {
    const { prompt } = req.body;
    try {
      //similar to the process for music generation
        const response = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
              input: {
                fps: 24,
                model: "xl",
                width: 1024,
                height: 576,
                prompt: prompt,
                batch_size: 1,
                num_frames: 24,
                init_weight: 0.5,
                guidance_scale: 17.5,
                negative_prompt: "",
                remove_watermark: false,
                num_inference_steps: 50
              }
            }
          );
        //only if a video is present
        if (response && response.data[0]) {
            res.json({ videoUrl: response.data[0] });
        } else {
            throw new Error('Something is wrong with Replicate AI');
        }
    } catch (error) {
        console.error('Error communicating with Replicate AI', error.message);
        res.status(500).json({ error: 'Failed to generate video' });
    }
});

  //always output what port is being used to console for ease of debugging and transparency 
  app.listen(port, () => {
    console.log("Server running on " + port);
  });

