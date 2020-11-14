const express = require('express')
const UserController = require('./controllers/UserController')
const RecipesController = require('./controllers/RecipesController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()


// Rotas
routes.post('/sessions', SessionController.create)

routes.get('/profile', ProfileController.index)

routes.get('/users', UserController.index)
routes.post('/users', UserController.create)

routes.get('/recipes', RecipesController.index)
routes.post('/recipes', RecipesController.create)
routes.delete('/recipes/:id', RecipesController.delete)

module.exports = routes