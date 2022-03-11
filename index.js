const express = require('express');
const app = express();
const database = require('./config/database');
const routes = require('./routes');

const databaseConnection = async () =>{
	try {
		await database.authenticate();
		console.log('Database connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

databaseConnection();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(routes);

app.listen(8080, () => {
	console.log('Server listening on port 8080');
});
