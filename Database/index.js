const {Pool} = require('pg');
const models = require('../Model/models.js');
const itemsPerPage = 10;

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'testing',
//   password: 'postgres',
//   port: 5432,
// });

const pool = new Pool({
  user: 'gzmacat',
  host: 'localhost',
  database: 'productsdb',
  password: 'password',
  port: 5432,
});

pool.connect();

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

    return pool.query(queryString, queryArgs);
  },
  getOneProduct: function(product_id) {
    // var queryString =
    // 'SELECT * FROM products WHERE id = $1';
    // return pool.query(queryString, [product_id]);
    var queryString =
    'SELECT products.*, ARRAY_AGG(\
      json_build_object( \
        \'feature\', features.feature, \
        \'value\', features.value \
      )) AS features\
    FROM products\
    INNER JOIN features\
    ON products.id = features.product_id\
    WHERE product_id = $1\
    GROUP BY products.id';



    // 'SELECT products.*, \
    // array_agg( row_to_json(features.feature, features.value ORDER BY features.id)) \
    // AS features\
    // FROM products \
    // INNER JOIN features \
    // ON products.id = features.product_id \
    // WHERE products.id = $1 \
    // GROUP BY products.id';

    return pool.query(queryString, [product_id]);

  },
  getStyles: function(product_id, callback) {
    var queryString =
    'SELECT styles.product_id, \
      JSON_BUILD_ARRAY ( \
        JSON_BUILD_OBJECT ( \
          \'style_id\', styles.id, \
          \'name\', styles.name, \
          \'original_price\', styles.original_price, \
          \'sale_price\', styles.sale_price, \
          \'default?\', styles.default_style, \
          \'photos\', ARRAY_AGG ( DISTINCT \
            JSONB_BUILD_OBJECT ( \
              \'thumbnail_url\', photos.thumbnail_url, \
              \'url\', photos.url \
            ) \
          ) \
        ) \
      ) AS results, \
      JSON_OBJECT_AGG( DISTINCT \
        skus.id, JSONB_BUILD_OBJECT( \
          \'quantity\', skus.quantity, \
          \'size\', skus.size \
        ) \
      ) AS skus \
    FROM styles \
    INNER JOIN skus \
    on styles.id = skus.style_id \
    INNER JOIN photos \
    ON styles.id = photos.style_id \
    WHERE styles.product_id = $1 \
    GROUP BY styles.id';

    return pool.connect()
    .then(client => {
      return client.query(queryString, [product_id])
        .then(response => {
          client.release();
          callback(null, response);
        })
    })
    .catch(err => {
      client.release();
      callback(err);
    })
  },
  getRelated: function(product_id){
    var queryArgs = [product_id];
    var queryString =
    'SELECT ARRAY_AGG(related_product_id) AS related\
    FROM related \
    WHERE current_product_id = $1';
    return pool.query(queryString, queryArgs);
  }
}