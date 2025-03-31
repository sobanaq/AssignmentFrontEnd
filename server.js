// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files from 'public' directory
// Helper function to call Supabase Edge Functions

const callSupabase = async (endpoint, method, body) => {
  const response = await fetch(`${SUPABASE_URL}/functions/v1/${endpoint}`, {
    method,
    headers: {
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    throw new Error(`Supabase returned ${response.status}: ${response.statusText}`);
  }

  return response.json();
};


// CRUD for Books
app.post('/api/new_book', async (req, res) => {
  try {
    const data = await callSupabase('books', 'POST', req.body);
    res.json(data);
  } catch (error) {
    console.error('POST request error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/get_books', async (req, res) => {
  try {
    const data = await callSupabase('books', 'GET');
    res.json(data);
  } catch (error) {
    console.error('GET request error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/update_book', async (req, res) => {
  try {
    const data = await callSupabase('books', 'PUT', req.body);
    res.json(data);
  } catch (error) {
    console.error('PUT request error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/delete_book', async (req, res) => {
  try {
    const data = await callSupabase('books', 'DELETE', req.body);
    res.json(data);
  } catch (error) {
    console.error('DELETE request error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});