const {Client} = require('pg');
const client = new Client('postgresql://gzmacat:password@localhost:5432/testing');

beforeAll(() => {
  client.connect();
  client.query('DROP TABLE IF EXISTS tests');
  return;
});
afterAll(() => {
  return client.end();
});

describe('PostgreSQL Connection & Functionality', () => {
  it('connects to Postgres and uses select', () => {
    return client.query('SELECT $1::text as message', ['Hello world!'])
      .then(res => {
        expect(res.rows[0].message).toBe('Hello world!');
      });
  });
  it('connects to Postgres and creates a table', () => {
    return client.query('CREATE TABLE tests (id SERIAL PRIMARY KEY)')
      .then(
        expect(client.query('SELECT * FROM tests')).resolves
      );
  });
  it('connects to Postgres and alters a table', () => {
    return client.query('ALTER TABLE tests ADD COLUMN test_message text')
      .then(
        expect(client.query('SELECT test_message FROM tests')).resolves
      );
  });
  it('connects to Postgres and uses insert', () => {
    return client.query('INSERT INTO tests(test_message) VALUES (\'Hello world!\') RETURNING test_message')
      .then(res => {
        expect(res.rows[0].test_message).toBe('Hello world!');
      });
  });
});
