const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    const user_id = request.headers.authorization

    const recipes = await connection('recipes')
      .where('user_id', user_id)
      .select('*')

    return response.json(recipes)

  }
}