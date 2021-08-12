const frisby = require('frisby');

describe('Products', () => {
  it('Accepts GET Requests With no Parameters Specified', () => {
    return frisby.get('http://localhost:3000/products')
      .expect('status', 200)
  });
  it('Accepts GET Requests With Parameters Specified', () => {
    return frisby.get('http://localhost:3000/products?page=10&count=3')
      .expect('status', 200)
  });
});