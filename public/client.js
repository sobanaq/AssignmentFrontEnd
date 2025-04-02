// This function fetches data from the server and populates the result div
const fetchData = async (url) => {
    const resultElement = document.getElementById("result");
    resultElement.textContent = "Loading...";
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();

        if (url.includes("books")) {
            const rowsData = data.map(entry =>
                `<tr id="row-${entry.id}">
                    <td>${entry.title}</td>
                    <td>${entry.author}</td>
                    <td>${entry.ISBN || 'N/A'}</td>
                    <td>
                        <button class="update-btn" data-id="${entry.id}" data-title="${entry.title}" data-author="${entry.author}" data-isbn="${entry.ISBN || ''}">Update</button>
                        <button class="delete-btn" data-id="${entry.id}">Delete</button>
                    </td>
                </tr>`
            ).join("");

            resultElement.innerHTML = `<table>
                <tr><th>Title</th><th>Author</th><th>ISBN</th><th>Actions</th></tr>
                ${rowsData}
            </table>`;

            // Add event listeners for Update buttons
            const updateButtons = document.querySelectorAll('.update-btn');
            updateButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const { id, title, author, isbn } = event.target.dataset;
                    updateBookForm(id, title, author, isbn);
                });
            });

            // Add event listeners for Delete buttons
            const deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const id = event.target.dataset.id;
                    deleteData('/api/delete_book', { id });
                });
            });

            return data;
        } else {
            resultElement.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        }
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
    }
};

// Post data to the server to create a new book
export const postData = async (url, body) => {
    if (!body.author || !body.title) {
        alert('Missing book title or author');
    } else {
        try {
            await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            fetchData("/api/get_books");
        } catch (error) {
            document.getElementById("result").textContent = `Error: ${error.message}`;
        }
    }
};

// Update book data on the server
const updateData = async (url, body) => {
    try {
        await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        fetchData("/api/get_books");
    } catch (error) {
        document.getElementById("result").textContent = `Error: ${error.message}`;
    }
};

// Delete book data from the server
const deleteData = async (url, body) => {
    try {
        await fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        fetchData("/api/get_books");
    } catch (error) {
        document.getElementById("result").textContent = `Error: ${error.message}`;
    }
};

// Listen to "Get Books" button click
document.getElementById("getBooks").addEventListener("click", () => fetchData("/api/get_books"));

// Listen to "Post Book" button click (for new book)
document.getElementById("postBook").addEventListener("click", () => {
    const body = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value
    };
    postData("/api/new_book", body);
});

// This function populates the form with the book data when updating a book
const updateBookForm = (id, title, author, ISBN) => {
    document.getElementById("bookFormTitle").textContent = "Update Book";
    document.getElementById("title").value = title;
    document.getElementById("author").value = author;
    document.getElementById("isbn").value = ISBN || '';  
    document.getElementById("postBook").textContent = "Update Book";  

    // Change the button's event listener to update the book
    document.getElementById("postBook").removeEventListener("click", postNewBook);
    document.getElementById("postBook").addEventListener("click", () => {
        const updatedBody = {
            id,
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            ISBN: document.getElementById('isbn').value
        };
        updateData("/api/update_book", updatedBody);
    });
};
