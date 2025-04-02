import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


// CREATE a new book
app.post('/api/new_book', async (req, res) => {
  try {
    const { title, author, ISBN } = req.body;
    const { data, error } = await supabase.from('books').insert([{ title, author, ISBN }]);

    if (error) throw error;
    res.json({ success: true, message: 'Book added successfully!', data });
  } catch (error) {
    console.error('POST request error:', error);
    res.status(500).json({ error: error.message });
  }
});

// READ all books
app.get('/api/get_books', async (req, res) => {
  try {
    const { data, error } = await supabase.from('books').select('*').order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('GET request error:', error);
    res.status(500).json({ error: error.message });
  }
});

// UPDATE a book
app.put('/api/update_book', async (req, res) => {
  try {
    const { id, title, author, ISBN } = req.body;
    const { data, error } = await supabase.from('books').update({ title, author, ISBN }).eq('id', id);

    if (error) throw error;
    res.json({ success: true, message: 'Book updated successfully!', data });
  } catch (error) {
    console.error('PUT request error:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE a book
app.delete('/api/delete_book', async (req, res) => {
  try {
    const { id } = req.body;
    const { error } = await supabase.from('books').delete().eq('id', id);

    if (error) throw error;
    res.json({ success: true, message: 'Book deleted successfully!' });
  } catch (error) {
    console.error('DELETE request error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
