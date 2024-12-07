import type { RequestHandler } from '@sveltejs/kit';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'mydb',
  password: 'sram',
  port: 5432,
});

export const GET: RequestHandler = async () => {
  try {
    const client = await pool.connect();
    try {
      const result = await client.query('SELECT * FROM read'); // Replace with your table name
      client.release();
      console.log('Database query result:', result.rows); // Log the result
      return new Response(JSON.stringify(result.rows), { status: 200 });
    } catch (queryError) {
      client.release();
      console.error('Error querying the database:', queryError);
      return new Response(JSON.stringify({ error: 'Error querying the database' }), { status: 500 });
    }
  } catch (connectionError) {
    console.error('Error connecting to the database:', connectionError);
    return new Response(JSON.stringify({ error: 'Error connecting to the database' }), { status: 500 });
  }
};
