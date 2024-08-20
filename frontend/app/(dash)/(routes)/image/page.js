"use client";
import MenuAppBar from "@/components/header";
import * as React from 'react';
import { useState } from "react";
import { Container, TextField, Button, Grid, Typography } from '@mui/material';

export default function ImagePage() {

    const [prompt, setPrompt] = useState('');
    const [generatedImage, setGeneratedImage] = useState('');

    const handleChange = (event) => {
        setPrompt(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/dalle', {
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
            setGeneratedImage(data.imageUrl);
        } catch (error) {
            console.error('Error generating image:', error);
        }
    };

    return (
        <div>
        <MenuAppBar name="Generate Images" />
        <Container component="main" maxWidth="sm">
                <Typography variant="h5" align="center" gutterBottom>
                    Let DALLE inspire you!
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
                                Generate Image
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                {generatedImage && (
                    <Grid container justifyContent="center" mt={4}>
                        <img src={generatedImage} alt={Response} style={{ maxWidth: '100%' }} />
                    </Grid>
                )}
            </Container>
        </div>
    );
}