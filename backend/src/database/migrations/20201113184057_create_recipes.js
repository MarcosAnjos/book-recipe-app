
exports.up = function (knex) {
  return knex.schema.createTable("recipes", function (table) {
    table.increments()
    table.string("title").notNullable();
    table.string("ingredients").notNullable();
    table.string("make").notNullable();

    // relacionamento
    table.string("user_id").notNullable()
    // chave estrangeira
    table.foreign("user_id").references("id").inTable("users")
  })
};

exports.down = function (knex) {
  return Knex.schema.dropTable("recipes")

};
