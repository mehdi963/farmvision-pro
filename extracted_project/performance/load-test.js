import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 10 }, // Ramp-up to 10 users
    { duration: '3m', target: 10 }, // Stay at 10 users
    { duration: '1m', target: 0 },  // Ramp-down to 0 users
  ],
};

export default function () {
  let res = http.get('http://localhost:4000/api/sensors');
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}