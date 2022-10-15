const { User, Character, Movie, Genre } = require('../models')

async function mockData () {
  await User.create({ email: 'ganozi@gmail.com', password: 'password' })
  const char1 = await Character.create({ name: 'Mickey', age: 30 })
  const char2 = await Character.create({ name: 'Minie', age: 40 })
  const char3 = await Character.create({ name: 'Donald', age: 50 })
  const movie1 = await Movie.create({ title: 'Tiburon' })
  const movie2 = await Movie.create({ title: 'Matrix' })
  const movie3 = await Movie.create({ title: 'Back to the future' })
  const genre1 = await Genre.create({ name: 'adventure' })
  const genre2 = await Genre.create({ name: 'thriller' })

  await char1.addMovies([movie1, movie2])
  await char2.addMovies([movie1, movie2, movie3])
  await char3.addMovies([movie3])
  await char1.save()
  await char2.save()
  await char3.save()

  await movie1.setGenre(genre1)
  await movie2.setGenre(genre2)
  await movie3.setGenre(genre1)
  await movie1.save()
  await movie2.save()
  await movie3.save()
}

mockData()
