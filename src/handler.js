const nanoid = require('nanoid');
const books = require('./books');

//TODO 1 --> addBookHandler
const addBookHandler = (request, h) => {
	
	const id = nanoid(16)
	const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
	const finished = pageCount === readPage;
	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;
	const newBooks = {
		name, year, author, summary, publisher, pageCount, readPage, finished, insertedAt, updatedAt
	}

	books.push(newBooks);

	if(name === undefined) {
		const response = h.response({
			"status" : "fail",
			"message": "Gagal menambahkan buku. Mohon isi nama buku"

		})
		response.code(400)
		return response;

	};
	
	if(readPage > pageCount) {
		const response = h.response({
			"status": "fail",
			"message": "Gagal menambahkan buku, readPage tidak boleh lebih besar dari pageCount",
		})
		response.code(400);
		return response;
	};

	const isSuccess = books.filter((book) => book.id === id).length > 0;
	if(isSuccess) {
		const response = h.response({
			"status": "success",
			"message": "Buku berhasil ditambahkan",
			"data": {
				"bookId": id,
			},
		});
		response.coed(201);
		return response;
	}

	const response = h.response({
		"status": "fail",
		"message": "Buku gagal ditambahkan",
	});
	response.code(500);
	return response;

};

//TODO 2 --> getAllBooksHandler
const getAllBooksHandler = (request, h) => ({
		"status": "success",
		"data": {
			books,
		},
});


//TODO 3 --> getBookByIdHandler
const getBookByIdHandler = (request, h) => {
	const {id} =  request.params;

	const book = books.filter((n) => n.id === id)[0];

	if(book !== undefined) {
		return {
			"status": "success",
			"data": {
				book,
			},
		};
	}


	const response = h.response({
		"status": "fail",
		"message": "Buku tidak ditemukan",
	});
	response.code(404);
	return response;
};


//TODO 4 --> editBookByIdhandler
const editBookByIdhandler = (request, h) => {
	const {id} = request.params;

	const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
	const updatedAt = new Date().toISOString();

	const index = books.filter((book) => book.id === id);


	if(name === undefined) {
		const response = h.response({
			"status": "faiil",
			"message": "Gagal memperbaharui buku, Mohon isi nama buku",
		});
		response.code(400);
		return response;
		

	};
	
	if(readPage > pageCount) {
		const response = h.response({
			"status": "fail",
			"message": "Gagal memperbaharui buku, readPage tidak boleh lebih besar daripada pageCount",
		});
		response.code(400);
		return response;
	};

	if(id === undefined) {
		const response = h.response({
			"status": "fail",
			"message": "gagal memperbaharui buku, Id tidak ditemukan",
		});
		response.code(404);
		return response;
	};

	if(index !== -1) {
		books[index] = {
			...books[index],
			name, 
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage, 
			reading, 
			updatedAt
		}
		const response = h.response({
			"status": "success",
			"message": "Buku berhasil diperbaharui",
		})
		response.code(200);
		return response;
	}

};

//TODO 4 --> deleteByIdHandler 
const deleteByIdHandler = (request, h) => {
	const {id} = request.params;

	const index = books.filter((book) => book.id === id);

	if(index !== -1) {
		books.splice(index, 1);

		const response = h.response({
			"status": "success",
			"message": "Buku berhasil dihapus",
		})
		response.code(200);
		return response;
	}
	
	const response = h.response({
		"status": "fail",
		"message": "Buku gagal dihapus, Id tidak ditemukan",
	});
}

module.exports = {
	addBookHandler,
	getAllBooksHandler,
	getBookByIdHandler,
	editBookByIdhandler,
	deleteByIdHandler
}
