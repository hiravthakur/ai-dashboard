"use client";
import MenuAppBar from "@/components/header";
import * as React from 'react';
import { useState } from "react";
import { Container, TextField, Button, Grid, Typography } from '@mui/material';

//renders music generation prompt page
export default function MusicPage() {

    const [prompt, setPrompt] = useState('');
    const [generatedMusic, setGeneratedMusic] = useState('');

    const handleChange = (event) => {
        setPrompt(event.target.value);
    };

//attempts to contact Replicate API through backend and then process response
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/music', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) {
                throw new Error('Something is wrong with the network response');
            }

            const data = await response.json();
            setGeneratedMusic(data.musicUrl);
        } catch (error) {
            console.error('Error generating music:', error);
        }
    };


    return (
        <div>
        <MenuAppBar name="Generate Music" />
        <Container component="main" maxWidth="sm">
                <Typography variant="h5" align="center" gutterBottom>
                    Cook up some Fire Beats innit.
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="prompt"
                                label="Enter Prompt"
                                name="prompt"
                                value={prompt}
                                onChange={handleChange}
                                multiline
                                rows={2}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Generate Audio
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                {generatedMusic && (
                    <Grid container justifyContent="center" mt={4}>
                         <audio controls src={generatedMusic} style={{ maxWidth: '100%' }}></audio>
                    </Grid>
                )}
            </Container>
        </div>
        
    );
}