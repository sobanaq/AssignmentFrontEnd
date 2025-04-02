// This function fetches data from the server and populates the result div
export const fetchData = async (url) => {
    const resultElement = document.getElementById("result");
    resultElement.textContent = "Loading...";
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();

        if (url.includes("books")) {
            const rowsData = data.map(entry =>
                `<tr id="row-${entry.id}">
                    <!-- Changed static text to input fields for inline editing -->
                    <td><input type="text" class="title-input" data-id="${entry.id}" value="${entry.title}"></td> 
                    <td><input type="text" class="author-input" data-id="${entry.id}" value="${entry.author}"></td> 
                    <td><input type="text" class="isbn-input" data-id="${entry.id}" value="${entry.ISBN || 'N/A'}"></td> 
                    <td>
                        <button class="update-btn" data-id="${entry.id}">Update</button> 
                        <button class="delete-btn" data-id="${entry.id}">Delete</button>
                    </td>
                </tr>`
            ).join("");

            resultElement.innerHTML = `<table>
                <tr><th>Title</th><th>Author</th><th>ISBN</th><th>Actions</th></tr>
                ${rowsData}
            </table>`;

            // ADDED: Event listeners for Update buttons
            document.querySelectorAll('.update-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    const id = event.target.dataset.id;

                    // Retrieve values from the input fields instead of button dataset
                    const title = document.querySelector(`.title-input[data-id='${id}']`).value;
                    const author = document.querySelector(`.author-input[data-id='${id}']`).value;
                    const ISBN = document.querySelector(`.isbn-input[data-id='${id}']`).value;

                    const updatedBody = { id, title, author, ISBN };
                    updateData("/api/update_book", updatedBody); // Send update request
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
export const updateData = async (url, body) => {
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
export const deleteData = async (url, body) => {
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
            id: document.getElementById('id').value,
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            ISBN: document.getElementById('isbn').value
        };
        updateData("/api/update_book", updatedBody);
    });
};
