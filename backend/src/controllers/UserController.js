const connection = require('../database/connection')
const generateUniqueId = require('../utils/generateUniqueId')

module.exports = {
  async index(request, response) {
    const users = await connection('users').select('*')

    return response.json(users)
  },
  async create(request, response) {
    const {
      name,
      email,
      whatsapp,
      city,
      uf
    } = request.body

    // console.log(name)
    // usar crypto para gerar ID de user
    const id = generateUniqueId()

    // conexao com BD 
    await connection('users').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })

    return response.json(id)
  }
}