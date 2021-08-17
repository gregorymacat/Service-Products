import http from 'k6/http';
import { check, sleep } from 'k6';

export var options = {
  vus: 1, // 1 user looping
  duration: '1m', // for 1 minute

  thresholds: {
    http_req_duration: ['p(99)<2000'], // 99% of requests must complete below 1.5s
  },
}

const URL = 'http://localhost:3000/products';

export default function () {
  var manyProductRes = http.get(URL);
  check(manyProductRes, {'retrieved prodcuts successfully': (r) => r.status == 200 });
  sleep(1);
}