const { Character, Movie } = require('../models')

async function getAll (req, res) {
  const { order } = req.query
  try {
    if (order && (order === 'asc' || order === 'desc')) {
      const movies = await Movie.findAll({
        order: [
          ['createdAt', `${order}`]
        ],
        attributes: ['picture', 'title', 'createdAt']
      })
      res.status(200).json(movies)
    } else if (!order) {
      const movies = await Movie.findAll({
        where: req.query,
        attributes: ['picture', 'title', 'createdAt']
      })
      res.status(200).json(movies)
    } else {
      res.status(500).json({ message: 'try again with correct queries' })
    }
  } catch (error) {
    res.status(500)
  }
}

async function getSingle (req, res) {
  try {
    const movie = await Movie.findByPk(req.params.id, {
      include: {
        model: Character,
        as: 'characters',
        through: {
          attributes: []
        }
      }
    })
    res.status(200).json(movie)
  } catch (error) {
    res.status(500)
  }
}

async function create (req, res) {
  const { picture, title, calification } = req.body
  try {
    const movie = await Movie.create({ picture, title, calification })
    res.status(201).json({ message: 'movie created', movie })
  } catch (error) {
    console.log(error)
    res.status(500)
  }
}

async function edit (req, res) {
  const { id } = req.params
  try {
    const movie = await Movie.findByPk(id)
    !movie && res.status(500).json({ message: `Movie ${id} not exist` })
    await Movie.update(req.body, { where: { id } })
    res.status(201).json({
      message: `Movie ${id} edited successfully.`
    })
  } catch (error) {
    res.status(500)
  }
}

async function remove (req, res) {
  const { id } = req.params
  try {
    const movie = await Movie.findByPk(id)
    !movie && res.status(500).send({ message: `Movie ${id} not exist` })

    await Movie.destroy({ where: { id } })

    res.status(202).send({
      message: `Movie ${movie.id} destroyed.`
    })
  } catch (error) {
    res.status(500)
  }
}

module.exports = { getAll, getSingle, create, edit, remove }
