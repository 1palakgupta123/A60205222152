
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { listAll, getStats } from '../api';

export default function StatsList() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => { listAll().then(setItems); }, []);
  return (
    <Box mt={4}>
      {items.map(i => (
        <Box key={i.shortcode} mb={3} p={2} border="1px solid #ddd">
          <Typography variant="h6">{i.originalUrl}</Typography>
          <Typography>Short: {window.location.origin}/{i.shortcode}</Typography>
          <Typography>Created: {i.createdAt}</Typography>
          <Typography>Expiry: {i.expiry}</Typography>
          <Typography>Clicks: {i.clickCount}</Typography>
          <Button onClick={async () => {
            const d = await getStats(i.shortcode);
            alert(JSON.stringify(d.clicks, null, 2));
          }}>Show Clicks</Button>
        </Box>
      ))}
    </Box>
  );
}
