const router = require('express').Router();
const fetchers = require('../Database/index.js');
const models = require('../Model/models.js');

router.get('/', (req, res) => {
  res.send('Hello World!');
});
router.get('/test', (req, res) => {

});
router.get('/products', (req, res) => {
  var page = req.query.page || 1;
  var count = req.query.count || 5;

  fetchers.getMultipleProducts(page, count)
    .then(response => {
      console.log('Success retrieving data');
      return res.send(response.rows);
    })
    .catch(err => {
      console.error('UNABLE TO RETRIEVE DATA FROM DATABASE ', err);
      return res.sendStatus(404);
    });
});
router.get('/products/:product_id', (req, res) => {
  fetchers.getOneProduct(req.params.product_id)
    .then(response => {
      res.send(response.rows);
    })
    .catch(err => {
      console.error('UNABLE TO RETRIEVE DATA FROM DATABASE ', err);
      return res.sendStatus(404);
    });
});
router.get('/products/:product_id/styles', (req, res) => {
  fetchers.getStyles(req.params.product_id)
    .then(response => {
      console.log('Success retrieving data');
      return res.send(response.rows);
    })
    .catch(err => {
      console.error('UNABLE TO RETRIEVE DATA FROM DATABASE ', err);
      return res.sendStatus(404);
    });
});
router.get('/products/:product_id/related', (req, res) => {
  fetchers.getRelated(req.params.product_id)
    .then(response => {
      console.log('Success retrieving data ', response);
      return res.send(response.rows);
    })
    .catch(err => {
      console.error('UNABLE TO RETRIEVE DATA FROM DATABASE ', err);
      return res.sendStatus(404);
    });
});


module.exports.router = router;