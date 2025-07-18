
import React, { useState } from 'react';
import ShortenerForm from './components/ShortenerForm';
import StatsList from './components/StatsList';
import { Container, Typography, Box } from '@mui/material';

export default function App() {
  const [newLinks, setNewLinks] = useState<any[]>([]);
  return (
    <Container>
      <Typography variant="h4" mt={4}>URL Shortener</Typography>
      <ShortenerForm onAdded={l => setNewLinks([...newLinks, l])} />
      {newLinks.map(l => (
        <Box key={l.shortLink}>
          <Typography>Short link: <a href={l.shortLink} target="_blank" rel="noreferrer">{l.shortLink}</a></Typography>
          <Typography>Expiry: {l.expiry}</Typography>
        </Box>
      ))}
      <Typography variant="h5" mt={4}>Statistics</Typography>
      <StatsList />
    </Container>
  );
}
