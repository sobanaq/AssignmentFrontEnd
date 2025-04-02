# Book Library Management System

## Overview
This project is a simple **Book Library Management System** that allows users to:
- View a list of books from a database
- Add new books
- Update book details inline (title, author, and ISBN)
- Delete books from the library

The system is built using **JavaScript (client-side)** and **Node.js with Supabase (server-side)**.

---

## Features
### 1. Fetch and Display Books
- The application retrieves a list of books from the backend API and displays them in a table format.
- Each book has editable fields for **title, author, and ISBN**.

### 2. Add a New Book
- Users can add a new book by entering the title and author.
- Clicking the "Post Book" button sends a request to the backend to store the new book in the database.

### 3. Update a Book
- Books can be updated **inline** directly in the table.
- Clicking the "Save" button next to each book sends an update request to the server.

### 4. Delete a Book
- Each book has a "Delete" button that allows users to remove the book from the database.
- Clicking the "Delete" button sends a request to the backend to delete the book.

---

## How It Works
### **Client-Side (client.js)**
- Fetches books from the backend and populates the table.
- Allows users to edit books directly in input fields.
- Handles "Save" and "Delete" button clicks to update or remove books.
- Uses JavaScript **fetch API** to communicate with the backend.

### **Server-Side (server.js)**
- Uses **Supabase** for database storage.
- Provides API endpoints for CRUD operations:
  - **GET /api/get_books** → Fetch all books
  - **POST /api/new_book** → Add a new book
  - **PUT /api/update_book** → Update book details
  - **DELETE /api/delete_book** → Remove a book from the database

---

## Setup Instructions
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo-url.git
   cd book-library
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   node server.js
   ```
4. Open `index.html` in a browser to use the application.

---

## Technologies Used
- **Frontend:** JavaScript, HTML, CSS
- **Backend:** Node.js, Supabase
- **Database:** PostgreSQL (via Supabase)

---

## Future Improvements
- Improve UI with a modern framework (React/Vue)
- Implement user authentication
- Add book categories and filtering options

---

## Author
Developed by Sobana Qadus

---

