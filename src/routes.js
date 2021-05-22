const {addBookHandler} = require('./handler')

const routes = [
	{
		method: 'POST',
		path: '/books',
		handler: addBookHandler
	},
	{
		method: ''
	}
];


module.exports = routes;