const frisby = require('frisby');
const Joi = frisby.Joi;

describe('Multiple Products API Endpoint', () => {
  it('accepts GET requests without parameters', () => {
    return frisby.get('http://localhost:3000/products')
      .expect('status', 200)
  });
  it('accepts GET requests with parameters', () => {
    return frisby.get('http://localhost:3000/products?page=10&count=3')
      .expect('status', 200)
  });
});

describe('Single Product API Endpoint', () => {
  it('accepts GET requests with product id', () => {
    return frisby.get('http://localhost:3000/products/1')
      .expect('status', 200)
  });
  it('retrieves product information for id in GET request', () => {
    return frisby.get('http://localhost:3000/products/1')
      .expect('jsonTypes', {
        id: Joi.number(),
        name: Joi.string(),
        slogan: Joi.string(),
        description: Joi.string(),
        category: Joi.string(),
        default_price: Joi.number(),
        features: Joi.array().items(
          Joi.object().keys({
            feature: Joi.string(),
            value: Joi.string()
          })
        )
      });
  });
});

describe('Related Products API Endpoint', () => {
  it('accepts GET requests with product id', () => {
    return frisby.get('http://localhost:3000/products/1/related')
      .expect('status', 200)
  });
  // it('retrieves related products for id in GET request', () => {
  //   return frisby.get('http://localhost:3000/products/1')
  //     .expect()
  // });
});

describe('Product Styles API Endpoint', () => {
  it('accepts GET requests with product id', () => {
    return frisby.get('http://localhost:3000/products/1/styles')
      .expect('status', 200)
  });
});