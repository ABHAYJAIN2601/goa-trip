// Setting up the database connection
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host     : 'localhost',
      user     : 'root',
      password : 'password',
      database : 'yoga',
      charset  : 'utf8'
    }
  })
  const bookshelf = require('bookshelf')(knex)
  module.exports = bookshelf;
