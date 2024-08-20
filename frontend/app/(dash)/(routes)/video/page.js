"use client";
import MenuAppBar from "@/components/header";
import * as React from 'react';
import { useState } from "react";
import { Container, TextField, Button, Grid, Typography } from '@mui/material';

export default function VideoPage() {

    const [prompt, setPrompt] = useState('');
    const [generatedVideo, setGeneratedVideo] = useState('');

    const handleChange = (event) => {
        setPrompt(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/video', {
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
            setGeneratedVideo(data.videoUrl);
        } catch (error) {
            console.error('Error generating video:', error);
        }
    };


    return (
        <div>
        <MenuAppBar name="Generate Videos" />
        <Container component="main" maxWidth="sm">
                <Typography variant="h5" align="center" gutterBottom>
                    Create Revolutionary Visuals
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
                                Generate Video
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                {generatedVideo && (
                    <Grid container justifyContent="center" mt={4}>
                        <video controls src={generatedVideo} style={{ maxWidth: '100%' }} />
                    </Grid>
                )}
            </Container>
        </div>
        
    );
}