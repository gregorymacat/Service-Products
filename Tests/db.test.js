const {Client} = require('pg');
const client = new Client('postgresql://gzmacat:password@localhost:5432/testing');

beforeEach(() => {
  return client.connect();
});
afterEach(() => {
  return client.end();
});

test('Connects to Postgres and Testing Database', () => {
  return client.query('SELECT $1::text as message', ['Hello world!'])
    .then(res => {
      expect(res.rows[0].message).toBe('Hello world!');
    });
});
