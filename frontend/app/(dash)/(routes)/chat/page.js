"use client";
import MenuAppBar from "@/components/header";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

//renders chat generation prompt page, allows user to have complete conversation with chatGPT
export default function ChatPage() {
    const [messages, setMessages] = React.useState([]);
    const [input, setInput] = React.useState('');

    const handleSend = async () => {
        if (input.trim() != '') {
            setMessages([...messages, {text: input, sender: 'user'}]);
            setInput('');

            //API response here
            //attempts to contact OpenAI API through backend and then process response
            try {
                const response = await fetch('http://localhost:5000/api/chatgpt', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({message: input}),
                });
                if (!response.ok) {
                    throw new Error('Something is wrong with the network response');
                }
                const data = await response.json();

                const gptReply = { text: data.reply, sender:'GPT'};
                setMessages((prevMessages) => [...prevMessages, gptReply]);
            }
            catch (error) {
                console.error('Error sending message:', error);
            }

        }
    }

    return (
        <div>
        <MenuAppBar name="Chat" />
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '70vh', p: 10,}}>
        <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, border: '1px solid #d0d0d0', p: 2, borderRadius: 2}}>
          {messages.map((message, index) => (
            <Box key={index} sx={{ mb: 1, textAlign: message.sender === 'user' ? 'right' : 'left' }}>
              <Box
                sx={{
                  display: 'inline-block',
                  p: 1,
                  borderRadius: 2,
                  backgroundColor: message.sender === 'user' ? '#f0f0f0' : '#d1e7dd',
                }}
              >
                {message.text}
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <TextField
            variant="outlined"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSend();
                e.preventDefault();
              }
            }}
          />
          <Button variant="contained" onClick={handleSend} sx={{ ml: 1 }}>
            Send
          </Button>
        </Box>
      </Box>
        </div>
    );
}