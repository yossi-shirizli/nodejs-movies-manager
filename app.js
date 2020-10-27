const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const movieRouter = require('./routes/movieRoutes');

const app = express();

// **** MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  // Write request as logs to console
  app.use(morgan('dev'));
}

// Put the data from the body on the request object as json string
app.use(express.json());
// Serve static files
//app.use(express.static(`${__dirname}/public`));

// **** ROUTES
app.use('/api/v1/movies', movieRouter);

//undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
