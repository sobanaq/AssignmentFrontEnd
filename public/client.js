const fetchData = async (url) => {
    const resultElement = document.getElementById("result");
    resultElement.textContent = "Loading...";
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();

        // if we get some results from the database then we should create some rows of data in the table.
        // the table should have a delete and update button 
        if (url.includes("books")) {
            const rowsData = data.map(entry =>
                `<tr>
                    <td>${entry.title}</td>
                    <td>${entry.author}</td>
                    <td>${entry.ISBN || 'N/A'}</td>
                    <td>
                        <button onclick="updateBookForm('${entry.id}', '${entry.title}', '${entry.author}', '${entry.ISBN}')">Update</button>
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

export const postData = async (url, body) => {
    if (!body.author || !body.title) {
        alert('Missing book title or author');
    }
}