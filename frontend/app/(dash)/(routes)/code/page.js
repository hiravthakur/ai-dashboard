"use client";
import MenuAppBar from "@/components/header";
import * as React from 'react';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import { useState } from "react";



export default function CodePage() {
    const [codeInput, setCodeInput] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');

    const handleChange = (event) => {
        setCodeInput(event.target.value);
    };

    //handle api stuff
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: codeInput }),
            });

            if (!response.ok) {
                throw new Error('ChatGPT could not reply with generated code');
            }

            const data = await response.json();
            setGeneratedCode(data.code || 'No code generated'); // Ensure `data.code` is handled properly
        } catch (error) {
            console.error('Error sending code generation request:', error);
        }
    };

    return (
        <div>
        <MenuAppBar name="Generate Code" />
        <Container component="main" maxWidth="xs">
      <Typography variant="h5" align="center" gutterBottom>
        Need Help with some Programming?
      </Typography>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="code-input"
              label="Generate Code here"
              name="codeInput"
              value={codeInput}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Ask GPT
            </Button>
          </Grid>
        </Grid>
      </form>
      {generatedCode && (
        <Typography variant="h6" align="center" gutterBottom mt={4}>
          Generated Code:
        </Typography>
      )}
      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            <code>{generatedCode}</code>
                        </pre>
    </Container>
        </div>
    );
}