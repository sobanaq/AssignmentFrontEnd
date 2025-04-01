import { postData } from "./client"

describe('client', () => {
    test('post data function adds a book to the database', async () => {
        const testBook = { title: 'something', author: 'another thing' }
        const books = await postData("/api/new_book", testBook)
        expect(books).toBe([])
    })
})