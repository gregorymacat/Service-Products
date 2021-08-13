module.exports = {
  formatOneProduct: function(queryResults) {
    var finalProd = queryResults[0].rows[0];
    finalProd.features = queryResults[1].rows
    return finalProd;
  }
}