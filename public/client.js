// // Writing a function to communicate with our local server

// const getMessages = async () => {
//   const resultElement = document.getElementById("result");
//   resultElement.textContent = "Loading...";

//   try {
//     console.log("trying get messages")
//     const response = await fetch(`/api/get_messages`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }

//     const data = await response.json();
//     resultElement.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
//   } catch (error) {
//     resultElement.textContent = `Error: ${error.message}`;
//   }
// };

// const postMessage = async () => {
//   const resultElement = document.getElementById("result");
//   resultElement.textContent = "Loading...";

//   try {
//     const response = await fetch(`/api/new_message`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ message: "If you can see this POST is working :)" }),
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }

//     const data = await response.json();
//     resultElement.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
//   } catch (error) {
//     resultElement.textContent = `Error: ${error.message}`;
//   }
// };

// const getBooks = async () => {
//   const resultElement = document.getElementById("result");
//   resultElement.textContent = "Loading...";

//   try {
//     console.log("trying get books")
//     const response = await fetch(`/api/get_books`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }

//     const data = await response.json();
//     resultElement.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
//   } catch (error) {
//     resultElement.textContent = `Error: ${error.message}`;
//   }
// };

// const postBook = async () => {
//   const resultElement = document.getElementById("result");
//   resultElement.textContent = "Loading...";

//   try {
//     const response = await fetch(`/api/new_message`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ message: "If you can see this POST is working :)" }),
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }

//     const data = await response.json();
//     resultElement.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
//   } catch (error) {
//     resultElement.textContent = `Error: ${error.message}`;
//   }
// };


// document
//   .getElementById("callFunction")
//   .addEventListener("click", getBooks);


// // To begin try adding another button to use the postMessage function

const fetchData = async (url) => {
    const resultElement = document.getElementById("result");
    resultElement.textContent = "Loading...";
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        //resultElement.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        const rowsData = data.map(entry => {
            return (
                `<tr>
                <td>${entry.title}</td>
                <td>${entry.author}</td>
                <td>${entry.ISBN}</td>
                <td> <button onclick="deleteData('/api/delete_book', {id:${entry.id}})" id="deleteBook">Delete Book</button></td>
                </tr>`
            )
        })
        resultElement.innerHTML = `<table>
        <tr>
        <th>Title</th>
        <th>Author</th>
        <th>ISBN</th>
        <th></th>
        </tr>
${rowsData}
</table>`;
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
    }
  };
  
  const postData = async (url, body) => {
    const resultElement = document.getElementById("result");
    resultElement.textContent = "Loading...";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        resultElement.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
    }
  };
  
  // Update Message
  const updateData = async (url, body) => {
    const resultElement = document.getElementById("result");
    resultElement.textContent = "Updating...";
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        resultElement.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
    }
  };
  
  // Delete Message
  const deleteData = async (url,body) => {
    const resultElement = document.getElementById("result");
    resultElement.textContent = "Deleting...";
    try {
        const response = await fetch(url, { method: "DELETE" , body: JSON.stringify(body)});
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        resultElement.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
    }
  };
  
  document.getElementById("getMessages").addEventListener("click", () => fetchData("/api/get_messages"));
  document.getElementById("postMessage").addEventListener("click", () => postData("/api/new_message", { message: "Hello from the frontend!" }));
  document.getElementById("updateMessage").addEventListener("click", () => updateData("/api/update_message", { id: 1, message: "Updated message!" }));
  document.getElementById("deleteMessage").addEventListener("click", () => deleteData("/api/delete_message?id=1"));
  document.getElementById("getBooks").addEventListener("click", () => fetchData("/api/get_books"));
  