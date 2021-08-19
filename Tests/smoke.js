import http from 'k6/http';
import { check, sleep } from 'k6';

export var options = {
  vus: 1, // 1 user looping
  duration: '1m', // for 1 minute

  thresholds: {
    http_req_duration: ['p(99)<2000'], // 99% of requests must complete below 2s
  },
}
const URLs = {
  allProducts: 'http://localhost:3000/products',
  allProductsSpecified: 'http://localhost:3000/products?page=5&count=20',
  oneProduct: 'http://localhost:3000/products/1',
  styles: 'http://localhost:3000/products/1/styles',
  related: 'http://localhost:3000/products/1/related'
}

export default function () {
  var productRes = http.get(URLs.oneProduct);
  check(productRes, {'retrieved prodcuts successfully': (r) => r.status == 200 });
  sleep(1);
}