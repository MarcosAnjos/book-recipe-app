const connection = require('../database/connection')

module.exports = {
  async index(request, response) {
    // Paginação 
    const { page = 1 } = request.query
    // Quantidade de recipes
    const [count] = await connection('recipes').count()

    const recipes = await connection('recipes')
      .join('users', 'users.id', '=', 'recipes.user_id') // comparando os ID retornando os dados user & recipes
      .limit(5) // max 5 recipes per page
      .offset((page - 1) * 5) // (1-1)*5 = 5 | (2-1)*5 = 5 ... 
      .select([ // selecao dados a ser retornados 
        'recipes.*', // todas as info sobre receitas
        'users.name',
        'users.email',
        'users.whatsapp',
        'users.city',
        'users.uf',
      ])
    // Passando qtd de recipes no header da requisição
    response.header('X-Total-Count', count['count(*)']);

    return response.json(recipes)
  },

  async create(request, response) {
    const {
      title,
      ingredients,
      make
    } = request.body

    const user_id = request.headers.authorization


    const [id] = await connection('recipes').insert({
      title,
      ingredients,
      make,
      user_id
    })

    return response.json({ id })
  },

  async delete(request, response) {
    const { id } = request.params
    const user_id = request.headers.authorization

    const recipe = await connection('recipes')
      .where('id', id)
      .select('user_id')
      .first()

    if (recipe.user_id != user_id) {
      return response.status(401).json({
        error: 'Operação não permetida!'
      }) // 401 nao autorizado
    }

    await connection('recipes').where('id', id).delete()
    return response.status(204).send() // 204 resposta OK s/ conteudo

  }

}