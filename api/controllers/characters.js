const { Character, Movie } = require('../models')

async function getAll (req, res) {
  const { movies: movieId } = req.query
  try {
    if (movieId) {
      const movie = await Movie.findByPk(movieId, {
        include: {
          model: Character,
          as: 'characters',
          through: {
            attributes: []
          }
        }
      })
      if (!movie) res.status(400).json({ message: 'movie doesnt exists' })
      res.status(200).json({ movie: movie.title, characters: movie.characters })
    } else {
      const characters = await Character.findAll({
        where: req.query,
        attributes: ['name', 'picture']
      })
      res.status(200).json(characters)
    }
  } catch (error) {
    res.status(500)
  }
}

async function getSingle (req, res) {
  try {
    const character = await Character.findByPk(req.params.id, {
      include: {
        model: Movie,
        as: 'movies',
        through: {
          attributes: []
        }
      }
    })
    res.status(200).json(character)
  } catch (error) {
    res.status(500)
  }
}

async function create (req, res) {
  const { picture, name, age, weigth, history } = req.body
  try {
    const character = await Character.create({ picture, name, age, weigth, history })
    res.status(201).json({ message: 'character created', character })
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}

async function edit (req, res) {
  const { id } = req.params
  try {
    const character = await Character.findByPk(id)
    !character && res.status(500).json({ message: `Character ${id} not exist` })
    await Character.update(req.body, { where: { id } })
    res.status(201).json({
      message: `Character ${id} edited successfully.`
    })
  } catch (error) {
    res.status(500)
  }
}

async function remove (req, res) {
  const { id } = req.params
  try {
    const character = await Character.findByPk(id)
    !character && res.status(500).send({ message: `Character ${id} not exist` })

    await Character.destroy({ where: { id } })

    res.status(202).send({
      message: `Character ${character.id} destroyed.`
    })
  } catch (error) {
    res.status(500)
  }
}

module.exports = { getAll, getSingle, create, edit, remove }
