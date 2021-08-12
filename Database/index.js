const {Client} = require('pg');
const itemsPerPage = 10;

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
  getMultipleProducts: function(pageNum, count) {
    //High is inclusive, range of id #'s in page
    var low = pageNum === 1 ? 1 : (itemsPerPage + 1) * (pageNum - 1);
    var high = itemsPerPage * pageNum;

    var queryArgs = [low, high, count];
    var queryString = 'SELECT * FROM products \
    WHERE id BETWEEN $1 AND $2 LIMIT $3;'

    return client.query(queryString, queryArgs);
  },
  getOneProduct: function(product_id) {
    var queryString = 'SELECT * FROM products WHERE id = $1';
    return client.query(queryString, [product_id]);
  },
  getStyles: function(product_id) {
    var queryString = 'SELECT * FROM styles WHERE id = $1';
    return client.query(queryString, [product_id]);
  },
  getRelated: function(product_id){
    var queryArgs = [product_id];
    var queryString = 'SELECT * FROM related WHERE current_product_id = $1';
    return client.query(queryString, queryArgs);
  }
}

/*
`PREPARE query (int, int, int) AS \
      SELECT * FROM products \
      WHERE id BETWEEN $1 AND $2 LIMIT $3; \
    EXECUTE query(${low}, ${high}, ${count});`;
    */