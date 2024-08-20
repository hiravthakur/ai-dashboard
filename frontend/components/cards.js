import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';




//A card that holds options for the user to interact with
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
    onClick={onClick} //route information is passed through prop
  >
    <Card variant="outlined">
        <Typography sx={{ fontSize: 15 }} color="text.secondary" fontWeight={"bold"} gutterBottom>
          {title || 'Default Title'}
        </Typography>
    </Card>
  </Box>
  );
}
