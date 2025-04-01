import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js'; // Import Supabase client

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Handle GET request - Fetch all books
app.get('/api/get_books', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: error.message });
  }
});

// Handle POST request - Add a new book
app.post('/api/new_book', async (req, res) => {
  try {
    const { author, title, ISBN } = req.body;
    const { data, error } = await supabase
      .from('books')
      .insert([{ author, title, ISBN }]);
    if (error) throw error;
    res.json({ success: true, message: 'Book added!', data });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: error.message });
  }
});

// Handle PUT request - Update book details
app.put('/api/update_book', async (req, res) => {
  try {
    const { id, author, title, ISBN } = req.body;
    const { data, error } = await supabase
      .from('books')
      .update({ author, title, ISBN })
      .eq('id', id);
    if (error) throw error;
    res.json({ success: true, message: 'Book updated!', data });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: error.message });
  }
});

// Handle DELETE request - Remove a book
app.delete('/api/delete_book', async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Missing ID' });
    }

    const { data, error } = await supabase
      .from('books')
      .delete()
      .eq('id', id);
    if (error) throw error;
    res.json({ success: true, message: 'Book deleted!', data });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
