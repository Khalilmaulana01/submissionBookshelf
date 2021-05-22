const nanoid = require('nanoid');
const books = require('./books');

const addBookHandler = (require, h) => {
	
	const id = nanoid(16)
	const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
	const finished = books.filter((book) => book.pageCount === book.readPage)
	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;

	const newBooks = {
		name, year, author, summary, publisher, pageCount, readPage, finished, insertedAt, updatedAt
	}

	books.push(newBooks);

	const isFail = books.filter((book) => book.name === undifined)[0]
	if(isFail) {
		const response = h.response({
			"status" : "fail",
			"message": "Gagal menambahkan buku. Mohon isi nama buku"

		})
		response.code(400)
		return response;

	} else if () {
		
	}


}