import { postData, fetchData, updateData, deleteData } from("./client");


// Mock the fetch function globally
global.fetch = jest.fn();

describe("Client API Functions", () => {
    beforeAll(() => {
        global.fetch = jest.fn(); 
      });
      

    test("should post a new book and return the updated book list", async () => {
        const mockBook = { title: "Test Book", author: "Test Author" };
        const mockResponse = [{ id: 1, ...mockBook }];

        fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockResponse) });

        const result = await postData("/api/new_book", mockBook);
        expect(fetch).toHaveBeenCalledTimes(2); // First for posting, second for fetching updated books
        expect(result).toEqual(mockResponse);
    });

    test("should fetch all books", async () => {
        const mockBooks = [{ id: 1, title: "Book 1", author: "Author 1" }];
        fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockBooks) });

        const result = await fetchData("/api/get_books");
        expect(fetch).toHaveBeenCalledWith("/api/get_books");
        expect(result).toEqual(mockBooks);
    });

    test("should update a book and return the updated list", async () => {
        const updatedBook = { id: 1, title: "Updated Title", author: "Updated Author" };
        const mockUpdatedBooks = [updatedBook];

        fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockUpdatedBooks) });

        const result = await updateData("/api/update_book", updatedBook);
        expect(fetch).toHaveBeenCalledTimes(2); // First for updating, second for fetching updated books
        expect(result).toEqual(mockUpdatedBooks);
    });

    test("should delete a book and return the updated list", async () => {
        const bookId = 1;
        const mockUpdatedBooks = [];

        fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockUpdatedBooks) });

        const result = await deleteData("/api/delete_book", { id: bookId });
        expect(fetch).toHaveBeenCalledTimes(2); // First for deleting, second for fetching updated books
        expect(result).toEqual(mockUpdatedBooks);
    });

    test("should show error message when API fails", async () => {
        fetch.mockRejectedValueOnce(new Error("Failed to fetch"));

        const resultElement = document.createElement("div");
        resultElement.id = "result";
        document.body.appendChild(resultElement);

        await fetchData("/api/get_books");

        expect(resultElement.textContent).toBe("Error: Failed to fetch");
    });
});
