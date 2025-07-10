import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  // Versão do Postgres
  const databaseVersionResult = await query("SHOW server_version;");
  const database_version = databaseVersionResult.server_version;
  // Conexões máximas
  const maxConnectionsResult = await query("SHOW max_connections;");
  const max_connections = parseInt(maxConnectionsResult.max_connections);
  // Conexões usadas
  const activeConnectionsResult = await query("SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;", [process.env.POSTGRES_DB]);
  const active_connections = activeConnectionsResult.count;


  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: database_version,
        max_connections: max_connections,
        active_connections: active_connections
      }
    }
  });
}

async function query(queryString, queryParameters) {
  const result = await database.query(queryString, queryParameters);
  if (result) return result.rows[0];
  throw new Error("result has an unexpected value");
}

export default status;
