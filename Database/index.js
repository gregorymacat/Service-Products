const {Client} = require('pg');

// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'testing',
//   password: 'postgres',
//   port: 5432,
// });

const client = new Client({
  user: 'gzmacat',
  host: 'localhost',
  database: 'productsdb',
  password: 'password',
  port: 5432,
});

client.connect();

module.exports = {
  getAll: function() {
    return client.query('SELECT * FROM products WHERE id = 1');
  }
}