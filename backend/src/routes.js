const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const UserController = require('./controllers/UserController')
const RecipesController = require('./controllers/RecipesController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()


// Rotas
routes.post('/sessions', SessionController.create)

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown()
}), ProfileController.index)

routes.get('/users', UserController.index)

routes.post('/users', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}), UserController.create)

routes.get('/recipes', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), RecipesController.index)

routes.post('/recipes', celebrate({

  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),

  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    ingredients: Joi.string().required(),
    make: Joi.string().required()

  })
}), RecipesController.create)

routes.delete('/recipes/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), RecipesController.delete)

module.exports = routes