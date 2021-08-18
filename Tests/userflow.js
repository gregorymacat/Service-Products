import http from 'k6/http';
import { check, group, sleep } from 'k6';

export var options = {
  scenarios: {
    multipleUsersNormal: {
      executor: 'constant-vus',
      vus: 5,
      duration: '1m',
    }
  }
  thresholds: {
    http_req_duration: ['p(99)<2000'], // 99% of requests must complete below 2s
                      //{threshold: 'p(99)<2000', abortOnFail: true} another option if short
                      //circuiting is necessary
  },
}
const URLs = {
  allProducts: 'http://localhost:3000/products',
  allProductsSpecified: (pg, cnt) => `http://localhost:3000/products?page=${pg}&count=${cnt}`,
  oneProduct: (id) => `http://localhost:3000/products/${id}`,
  styles: (id) => `http://localhost:3000/products/${id}/styles`,
  related: (id) => `http://localhost:3000/products/${id}/related`
}
const EXAMPLE_ID = 150;
const SLEEP_DURATION = 0.1;

export default function () {
  group('Simple site 1 min site experience', () => {
    // Single product retrieval
    var oneProductRes = http.get(URLs.oneProduct(EXAMPLE_ID));
    check(oneProductRes, {'retrieved prodcuts successfully': (r) => r.status == 200 });
    sleep(SLEEP_DURATION);

    // Get items related to that product
    var relatedProductRes = http.get(URLs.related(EXAMPLE_ID));
    check(relatedProductRes, {'retrieved related items successfully': (r) => r.status == 200 });
    sleep(SLEEP_DURATION);

    // Get items styles of the product
    var styleProductRes = http.get(URLs.related(EXAMPLE_ID));
    check(styleProductRes, {'retrieved item styles successfully': (r) => r.status == 200 });
    sleep(SLEEP_DURATION);
  })

}