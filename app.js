const { json } = require('express');
const express = require('express');
const morgan = require('morgan');

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
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on the server`
  });
});
module.exports = app;
