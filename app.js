require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// Configs
require('./config/db.config');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
const routes = require('./config/routes.config');
app.use('/', routes)

// Error handling
app.use((error, req, res, next) => {
	if (error instanceof mongoose.Error.ValidationError) {
		error = createError.BadRequest(error);
	}

	res.status(error.status || 400).json({
		message: error.message || 'Bad Request'
	});
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log('Running on port ' + port);
});