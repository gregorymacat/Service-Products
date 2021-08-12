const router = require('express').Router();
const fetchers = require('../Database/index.js');

router.get('/', (req, res) => {
  res.send('Hello World!');
});
router.get('/test', (req, res) => {

});
router.get('/products', (req, res) => {
  fetchers.getMultipleProducts(req.query.page, req.query.count)
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
  res.send(req.params);
});
router.get('/products/:product_id/styles', (req, res) => {
  res.send(req.params);
});
router.get('/products/:product_id/related', (req, res) => {
  res.send(req.params);
});


module.exports.router = router;