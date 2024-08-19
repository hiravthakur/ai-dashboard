import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';





export default function OutlinedCard({title, onClick}) {
    
  return (
    <Box
    sx={{
      minWidth: 275,
      cursor: 'pointer',
      '&:hover': {
        boxShadow: 3, 
      },
    }}
    onClick={onClick}
  >
    <Card variant="outlined">
        <Typography sx={{ fontSize: 15 }} color="text.secondary" fontWeight={"bold"} gutterBottom>
          {title || 'Default Title'}
        </Typography>
    </Card>
  </Box>
  );
}
