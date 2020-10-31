const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const movieRouter = require('./routes/movieRoutes');
const settingRouter = require('./routes/settingRoutes');

const app = express();

// **** MIDDLEWARES
//Set Security Http headers
app.use(helmet());

//Logs
if (process.env.NODE_ENV === 'development') {
  // Write request as logs to console
  app.use(morgan('dev'));
}

//limit requests
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again in an hour!'
});
app.use('/api', limiter);

// Put the data from the body on the request object as json string
app.use(express.json());

//Data sanitization againt NoSQL query injection
app.use(mongoSanitize());
//Data sanitization againt XSS
app.use(xss());
//prevent parameter pollution
app.use(
  hpp({
    whitelist: ['status', 'ratingsAverage', 'duration', 'mpaa', 'geners']
  })
);

// Serve static files
//app.use(express.static(`${__dirname}/public`));

// **** ROUTES
app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/settings', settingRouter);

//undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
