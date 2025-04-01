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
                    <td><input type="text" id="title-${entry.id}" value="${entry.title}" /></td>
                    <td><input type="text" id="author-${entry.id}" value="${entry.author}" /></td>
                    <td>${entry.ISBN || 'N/A'}</td>
                    <td>
                        <button onclick="saveUpdate('${entry.id}')">Save</button>
                        <button onclick="deleteData('/api/delete_book', { id: ${entry.id} })">Delete</button>
                    </td>
                </tr>`
            ).join("");

            resultElement.innerHTML = `<table>
                <tr><th>Title</th><th>Author</th><th>ISBN</th><th>Actions</th></tr>
                ${rowsData}
            </table>`;
            return data;
        } else {
            resultElement.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        }
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
    }
};

const updateData = async (url, body) => {
    try {
        await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        await fetchData("/api/get_books");  
    } catch (error) {
        document.getElementById("result").textContent = `Error: ${error.message}`;
    }
};


const deleteData = async (id) => {  
    console.log("Deleting book with ID:", id);

    const response = await fetch('/api/delete_book', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
    });

    const data = await response.json();
    console.log("Delete response:", data);

    if (response.ok) {
        alert("Book deleted successfully!");
        location.reload(); 
    } else {
        alert("Error deleting book: " + data.error);
    }
};


window.deleteData = deleteData;



const postData = async (url, body) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        fetchData("/api/get_books"); 
    } catch (error) {
        document.getElementById("result").textContent = `Error: ${error.message}`;
    }
};

window.postData = postData;


document.getElementById("getBooks").addEventListener("click", () => fetchData("/api/get_books"));
document.getElementById("postBook").addEventListener("click", () => postData("/api/new_book", { 
    title: document.getElementById('title').value, 
    author: document.getElementById('author').value 
}));
