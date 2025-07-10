import { Client } from 'pg';

async function query(queryString, queryParameters) {
  const query = {
    text: queryString,
    values: queryParameters
  }
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  try {
    await client.connect();
    const result = await client.query(query);
    return result;
  } catch (error) {
    throw new Error("the query failed to return");
  } finally {
    await client.end();
  }
}


export default {
  query: query,
};
