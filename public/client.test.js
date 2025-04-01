import { postData, fetchData, updateData, deleteData } from "./client.js";

// Mock the fetch function globally
global.fetch = jest.fn();

describe("Client API Functions", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    test("should post a new book and return the updated book list", async () => {
        const mockBook = { title: "Test Book", author: "Test Author" };
        const mockResponse = [{ id: 1, ...mockBook }];

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockResponse),
        });

        const result = await postData("/api/new_book", mockBook);
        expect(global.fetch).toHaveBeenCalledTimes(1); 
        expect(global.fetch).toHaveBeenCalledWith("/api/new_book", expect.objectContaining({
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(mockBook),
        }));
    });

    test("should fetch all books", async () => {
        const mockBooks = [{ id: 1, title: "Book 1", author: "Author 1" }];
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockBooks),
        });

        const result = await fetchData("/api/get_books");
        expect(global.fetch).toHaveBeenCalledWith("/api/get_books");
        expect(result).toEqual(mockBooks);
    });

    test("should update a book and return the updated list", async () => {
        const updatedBook = { id: 1, title: "Updated Title", author: "Updated Author" };
        const mockUpdatedBooks = [updatedBook];

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockUpdatedBooks),
        });

        const result = await updateData("/api/update_book", updatedBook);
        expect(global.fetch).toHaveBeenCalledWith("/api/update_book", expect.objectContaining({
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedBook),
        }));
    });

    test("should delete a book and return the updated list", async () => {
        const bookId = 1;
        const mockUpdatedBooks = [];

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockUpdatedBooks),
        });

        const result = await deleteData("/api/delete_book", bookId);
        expect(global.fetch).toHaveBeenCalledWith("/api/delete_book", expect.objectContaining({
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: bookId }),
        }));
    });

    test("should show error message when API fails", async () => {
        global.fetch.mockRejectedValueOnce(new Error("Failed to fetch"));

        const resultElement = document.createElement("div");
        resultElement.id = "result";
        document.body.appendChild(resultElement);

        await fetchData("/api/get_books");

        expect(resultElement.textContent).toBe("Error: Failed to fetch");
    });
});
