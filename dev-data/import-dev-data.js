const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./../models/movieModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  //.connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

// Read JSON file
const movies = JSON.parse(fs.readFileSync(`${__dirname}/movies.json`, 'utf-8'));

// Import data to  DB
const importData = async () => {
  try {
    await Movie.create(movies);
    console.log('Movies successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all movies from DB
const deleteData = async () => {
  try {
    await Movie.deleteMany();
    console.log('All movies deleted from DB');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
