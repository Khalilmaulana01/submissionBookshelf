const {nanoid} = require('nanoid');
const books = require('./books');

//TODO 1 --> addBookHandler
const addBookHandler = (request, h) => {
	
	const id = nanoid(16)
	const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
	const finished = (pageCount === readPage);
	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;
	const newBooks = {
		name, year, author, summary, publisher, pageCount, readPage, finished, insertedAt, updatedAt
	}

	books.push(newBooks);

	if(name === undefined) {
		const response = h.response({
			status : 'fail',
			message: 'Gagal menambahkan buku. Mohon isi nama buku',

		})
		response.code(400)
		return response;

	};
	
	if(readPage > pageCount) {
		const response = h.response({
			status: 'fail',
			message: 'Gagal menambahkan buku, readPage tidak boleh lebih besar dari pageCount',
		})
		response.code(400);
		return response;
	};

	const isSuccess = books.filter((book) => book.id === id).length > 0;
	if(isSuccess) {
		const response = h.response({
			status: 'success',
			message: 'Buku berhasil ditambahkan',
			data: {
				bookId: id,
			},
		});
		response.code(201);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'Buku gagal ditambahkan',
	});
	response.code(500);
	return response;

};

//TODO 2 --> getAllBooksHandler
const getAllBooksHandler = (request, h) => {

	const {id, name, publisher} = request.params;
	const response = h.response({
		status: "success",
		data: {
			books,
		},
	});
	response.code(200);
	return response; 
/*
	const {name, reading, finished} = request.query;

	let filteredBooks = books;

	if(name !== undefined) {
		filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().include(name.toLowerCase()));
	};

	if(reading !== undefined) {
		filteredBooks = filteredBooks.filter((book) => book.reading === !!Number(reading))
	};

	if(finished !== undefined) {
		filteredBooks = filteredBooks.filter((book) => book.finished === !!Number(finished))
	};

	const response = h.response({
		status: "success",
		data: {
			books: filteredBooks,
			name: book.name,
			publisher: book.publisher,
		}
	})
	response.code(200);
	return response; */ 
}; 


//TODO 3 --> getBookByIdHandler
const getBookByIdHandler = (request, h) => {
	const {id} =  request.params;

	const book = books.filter((n) => n.id === id)[0];

	if(book !== undefined) {
		return {
			status: "success",
			data: {
				book,
			},
		};
	}


	const response = h.response({
		status: "fail",
		message: "Buku tidak ditemukan",
	});
	response.code(404);
	return response;
};


//TODO 4 --> editBookByIdhandler
const editBookByIdhandler = (request, h) => {
	const {id} = request.params;

	const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
	const updatedAt = new Date().toISOString();

	const index = books.findIndex((book) => book.id === id);

if(index !== -1) {
	if(name === undefined) {
		const response = h.response({
			status: "fail",
			message: "Gagal memperbaharui buku, Mohon isi nama buku",
		});
		response.code(400);
		return response;
		

	};
	
	if(readPage > pageCount) {
		const response = h.response({
			status: "fail",
			message: "Gagal memperbaharui buku, readPage tidak boleh lebih besar daripada pageCount",
		});
		response.code(400);
		return response;
	};

		const finished = (pageRead === pageCount);

		books[index] = {
			...books[index],
			name, 
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage, 
			finished,
			reading, 
			updatedAt
		}
		const response = h.response({
			status: "success",
			message: "Buku berhasil diperbaharui",
		})
		response.code(200);
		return response;
	}

	const response = h.response({
		status: "fail",
		message: "Gagal memperbaharui buku, Id Tidak ditemukan"
	});
	response.code(404);
	return response;

};

//TODO 4 --> deleteByIdHandler 
const deleteByIdHandler = (request, h) => {
	const {id} = request.params;

	const index = books.findIndex((book) => book.id === id);

	if(index !== -1) {
		books.splice(index, 1);

		const response = h.response({
			status: "success",
			message: "Buku berhasil dihapus",
		})
		response.code(200);
		return response;
	}
	
	const response = h.response({
		status: "fail",
		message: "Buku gagal dihapus, Id tidak ditemukan",
	});
	response.code(404);
	return response;
}

module.exports = {
	addBookHandler,
	getAllBooksHandler,
	getBookByIdHandler,
	editBookByIdhandler,
	deleteByIdHandler
}
