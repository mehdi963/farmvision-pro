const { Pool } = require('pg');

describe('Database Connection', () => {
  let pool;

  beforeAll(() => {
    pool = new Pool({
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      port: process.env.PGPORT || 5432,
    });
  });

  test('Should connect to the database and run a query', async () => {
    const res = await pool.query('SELECT 1+1 AS result');
    expect(res.rows[0].result).toBe(2);
  });

  afterAll(async () => {
    await pool.end();
  });
});