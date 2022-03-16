const express = require('express');
const app = express();
const database = require('./config/database');
const routes = require('./routes');

const init = () => {
	databaseConnection();
	startServer();
};

const databaseConnection = async () =>{
	try {
		await database.authenticate();
		console.log('Database connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

const startServer = () => {
	try {
		const port = 8080;

		app.set('view engine', 'ejs');
		app.use(express.static('public'));
		app.use(express.json())
		app.use(express.urlencoded({ extended: true}))
		app.use(routes);
		app.listen(port);

		console.log(`Server listening on port ${port}`);
	} catch (error) {
		console.log('Oh no, something went wrong', error);
	}
};

init();
