
import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { createShort } from '../api';
import { log } from '../loggingMiddleware';

export default function ShortenerForm({ onAdded }) {
  const [list, setList] = useState([{ url:'', val:'', sc:'' }]);
  const addRow = () => list.length < 5 && setList([...list, { url: '', val: '', sc: '' }]);
  const handle = (i, k, v) => {
    const copy = [...list];
    copy[i][k] = v;
    setList(copy);
  };
  const submitAll = async () => {
    for (const item of list) {
      try {
        if (!/^https?:\/\//.test(item.url)) throw new Error('Invalid URL');
        const payload: any = { url: item.url };
        if (item.val) payload.validity = parseInt(item.val);
        if (item.sc) payload.shortcode = item.sc;
        const res = await createShort(payload);
        onAdded(res);
      } catch (e: any) {
        log('FORM_ERR', { item, err: e.message });
        alert(`Error: ${e.message}`);
      }
    }
  };
  return (
    <Box>
      {list.map((r, i) => (
        <Box key={i} display="flex" gap={1} mb={1}>
          <TextField label="URL" value={r.url} onChange={e => handle(i, 'url', e.target.value)} fullWidth />
          <TextField label="Validity (min)" value={r.val} onChange={e => handle(i, 'val', e.target.value)} sx={{ width: 120 }} />
          <TextField label="Shortcode" value={r.sc} onChange={e => handle(i, 'sc', e.target.value)} sx={{ width: 120 }} />
        </Box>
      ))}
      <Button onClick={addRow} disabled={list.length >= 5}>Add</Button>
      <Button variant="contained" onClick={submitAll}>Shorten</Button>
    </Box>
  );
}
