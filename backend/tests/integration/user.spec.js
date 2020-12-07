const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('USER', () => {

  beforeEach(async () => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  afterAll(async () => {
    await connection.destroy()
  })

  it('Criando um novo USUARIO', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: "Marcos",
        email: "contato@contato.com",
        whatsapp: "4500000000",
        city: "Santa Helena",
        uf: "PR"
      })

    console.log(response.body)

  })
})