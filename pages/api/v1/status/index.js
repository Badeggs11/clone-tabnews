import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  console.log(updatedAt);

  const databaseVersionResult = await database.query("SELECT version();");
  const databaseVersionValue = databaseVersionResult.rows[0].version;

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections.split(" ")[0];

  const databaseName = process.env.POSTGRES_DB;
  console.log(`Banco de dados selecionado: ${databaseName}`);

  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  //"SELECT count(*)::int FROM pg_stat_activity WHERE datname = 'local_db';""
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;
  console.log(databaseOpenedConnectionsValue);

  const pgVersionResult = await database.query("SHOW server_version;");
  const pgVersion = pgVersionResult.rows[0].server_version.split(" ")[0];

  const result = await database.query("SELECT 1 + 1 as sum;");
  console.log(result);

  response.status(200).json({
    updated_at: updatedAt,
    postgres_version: pgVersion, // Nova informação mágica
    dependencies: {
      database: {
        version: pgVersion,
        databaseVersionValue,
        max_connections: databaseMaxConnectionsValue, // Pode adicionar mais informações
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
