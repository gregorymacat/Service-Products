const router = require('express').Router();
const {getAll} = require('../Database/index.js');

router.get('/', (req, res) => {
  res.send('Hello World!');
});
router.get('/test', (req, res) => {
  getAll()
    .then(response => {
      console.log('Success retrieving data');
      return res.send(response.rows);
    })
    .catch(err => {
      return console.error('UNABLE TO RETRIEVE DATA FROM DATABASE ', err)
    })
  ;
});
router.get('/products', (req, res) => {
  res.send(req.query.page);
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