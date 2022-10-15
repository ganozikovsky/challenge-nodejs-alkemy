const Character = require('./Character')
const Genre = require('./Genre')
const Movie = require('./Movie')
const User = require('./User')

Character.belongsToMany(Movie, { as: 'movies', through: 'character_movies' })
Movie.belongsToMany(Character, { as: 'characters', through: 'character_movies' })
Movie.belongsTo(Genre)

module.exports = {
  Character, Genre, Movie, User
}
