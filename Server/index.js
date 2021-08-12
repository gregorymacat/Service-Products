const express = require('express');
const app = express();
const port = 3000;
const router = require('./router.js').router;

//Logger
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(router);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
})