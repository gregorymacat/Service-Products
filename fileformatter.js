const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
  input: fs.createReadStream('./Database/photos.csv'),
  console: false
})

var missingQuote = 0;
readInterface.on('line', function(line) {
  if (line[line.length - 1] !== '"') {
    missingQuote += 1;
    console.log(line, missingQuote);
  }
})
