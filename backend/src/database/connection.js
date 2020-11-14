const knex = require('knex');
const cofiguration = require('../../knexfile')

const conection = knex(cofiguration.development)

module.exports = conection