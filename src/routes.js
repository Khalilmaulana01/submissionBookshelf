const{addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdhandler, deleteByIdHandler} = require('./handler')

const routes = [
	{
		method: 'POST',
		path: '/books',
		handler: addBookHandler,
	},
	{
		method: 'GET',
		path: '/books',
		handler: getAllBooksHandler,
	},
	{
		method: 'GET',
		path:  '/books/{id}',
		handler: getBookByIdHandler,
	},
	{
		method: 'PUT',
		path: '/books/{id}',
		handler: editBookByIdhandler,
	},
	{
		method: 'DELETE',
		path: '/books/{id}',
		handler: deleteByIdHandler,
	}
];


module.exports = routes;
