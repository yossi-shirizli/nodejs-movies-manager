const path = require('path');
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
const releaseRouter = require('./routes/releaseRoutes');
const settingRouter = require('./routes/settingRoutes');
const viewRouter = require('./routes/viewRoutes');
const jobRouter = require('./routes/jobRoutes');

const app = express();

//set template engine
app.set('view engine', 'pug');
//define were view are located on file system
app.set('views', path.join(__dirname, 'views'));

// **** MIDDLEWARES
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
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

// **** ROUTES
app.use('/', viewRouter);
// app.get('/', (req, res) => {
//   res.status(200).render('base');
// });

app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/releases', releaseRouter);
app.use('/api/v1/settings', settingRouter);
app.use('/api/v1/jobs', jobRouter);

//undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

app.use(globalErrorHandler);

const jobModel = require('./models/jobModel');
const jobController = require('./controllers/jobController');
const jobModelEventEmitter = jobModel.watch();
jobModelEventEmitter.on('change', change => {
  // console.log(JSON.stringify(change));
  jobController.executeJob();
});

module.exports = app;
