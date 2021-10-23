import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (
  host = process.env.POSTGRES_HOST
): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host,
      port: process.env.POSTGRES_PORT,
    })
  );
};
