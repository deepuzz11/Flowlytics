import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react'; // Don't forget to import useState

export default function MediaCard({ label, description, videoUrl, learnMore }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setIsClicked(!isClicked); // Toggle the state
  };

  return (
    <Card sx={{
      maxWidth: 400,
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '12px',
      overflow: 'hidden', 
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
      },
    }}>
      <CardMedia sx={{ height: 180 }}>
        <iframe
          width="100%"
          height="100%"
          src={videoUrl}
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </CardMedia>
      <CardContent sx={{ paddingBottom: '16px' }}>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#1E3A8A' }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ color: '#4B5563' }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button 
          size="small" 
          onClick={handleChange} 
          sx={{
            backgroundColor: "black", 
            color: "white", 
            marginBottom:"10px",
            '&:hover': { backgroundColor: '#333' }
          }}
        >
          Learn More
        </Button>
      </CardActions>
      {isClicked && (
        <CardContent sx={{ padding: '16px', textAlign: 'center' }}>
          <a 
            href={learnMore} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{
              textDecoration: 'none', 
              color: '#3B82F6', 
              fontWeight: 'bold',
              '&:hover': { color: '#2563EB' }
            }}
          >
            Click here to learn more
          </a>
        </CardContent>
      )}
    </Card>
  );
}
