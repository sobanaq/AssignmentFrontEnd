const fetchData = async (url) => {
    const resultElement = document.getElementById("result");
    resultElement.textContent = "Loading...";
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();

        if (url.includes("books")) {
            const rowsData = data.map(entry => 
                `<tr>
                    <td>${entry.title}</td>
                    <td>${entry.author}</td>
                    <td>${entry.ISBN || 'N/A'}</td>
                    <td>
                        <button onclick="updateData('/api/update_book', { id: ${entry.id}, title: 'Updated Title', author: 'Updated Author' })">Update</button>
                        <button onclick="deleteData('/api/delete_book', { id: ${entry.id} })">Delete</button>
                    </td>
                </tr>`
            ).join("");

            resultElement.innerHTML = `<table>
                <tr><th>Title</th><th>Author</th><th>ISBN</th><th>Actions</th></tr>
                ${rowsData}
            </table>`;
        } else {
            resultElement.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        }
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
    }
};

const postData = async (url, body) => {
    if (!body.author || !body.title) {
        alert('Missing book title or author')
    }
    else 
    {

        try {
            await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            // fetchData(url.includes("book") ? "/api/get_books" : "/api/get_users");
            fetchData("/api/get_books");
        } catch (error) {
            document.getElementById("result").textContent = `Error: ${error.message}`;
        }
    }
};

const updateData = async (url, body) => {
    try {
        await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        // fetchData(url.includes("book") ? "/api/get_books" : "/api/get_users");
        fetchData("/api/get_books");
    } catch (error) {
        document.getElementById("result").textContent = `Error: ${error.message}`;
    }
};

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

document.getElementById("getBooks").addEventListener("click", () => fetchData("/api/get_books"));
document.getElementById("postBook").addEventListener("click", () => postData("/api/new_book", { title: document.getElementById('title').value, author: document.getElementById('author').value }));

