const {Client} = require('pg');
const models = require('../Model/models.js');
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
  // COMPLETE
  getMultipleProducts: function(pageNum, count) {
    //High is inclusive, range of id #'s in page
    var low = pageNum === 1 ? 1 : (itemsPerPage * (pageNum - 1)) + 1;
    var high = itemsPerPage * pageNum;

    var queryArgs = [low, high, count];
    var queryString =
    'SELECT * \
    FROM products \
    WHERE id BETWEEN $1 AND $2 \
    LIMIT $3;'

    return client.query(queryString, queryArgs);
  },
  getOneProduct: function(product_id) {
    // var queryString =
    // 'SELECT * FROM products WHERE id = $1';
    // return client.query(queryString, [product_id]);
    var queryString =
    'SELECT \
      json_build_object( \
        \'feature\', f.feature, \
        \'value\', f.value \
      ) \
    FROM features f\
    WHERE product_id = $1';



    // 'SELECT products.*, \
    // array_agg( row_to_json(features.feature, features.value ORDER BY features.id)) \
    // AS features\
    // FROM products \
    // INNER JOIN features \
    // ON products.id = features.product_id \
    // WHERE products.id = $1 \
    // GROUP BY products.id';

    return client.query(queryString, [product_id])
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
Way to prepare instead of $
`PREPARE query (int, int, int) AS \
      SELECT * FROM products \
      WHERE id BETWEEN $1 AND $2 LIMIT $3; \
    EXECUTE query(${low}, ${high}, ${count});`;

Example of inner join that works for a single product except it returns
as two separate objects
var queryString =
    'SELECT products.*, features.feature, features.value FROM products \
    INNER JOIN features ON products.id = features.product_id \
    WHERE products.id = $1';

Attempting to use array agg. So far this returns an array of space
separated strings.
SELECT ARRAY_AGG(feature || \' \' || value) AS features

This works to return a JSON object of all rows of features with the title
row_to_json
'SELECT row_to_json((SELECT d FROM (SELECT feature, value) d))\
    FROM features \
    WHERE product_id = $1'
    */