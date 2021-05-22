const Hapi = require('hapi/hapi');
const nanoid = require('nanoid');

const init = async () => {
	const server = Hapi.server({
		port: 5000
		host: 'localhost'
		
	});

	server.route(routes)

	await server.start();
	console.log(`Server berjalan pada ${server.info.uri}`);

};

init();