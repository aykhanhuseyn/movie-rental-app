var mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  Schema = mongoose.Schema;

// Setup schema
var movieSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  imdb: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  uploaded: {
    type: Date,
    default: Date.now,
  },
  release_date: {
    type: Date,
    required: true,
  },
});

// Export Movie model
var Movie = mongoose.model("movie", movieSchema);
Movie.get = function (callback, limit) {
    Movie.find(callback).limit(limit);
};

module.exports = Movie;
