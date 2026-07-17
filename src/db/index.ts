import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

declare global {
  var __ekSafarPgClient: ReturnType<typeof postgres> | undefined;
}

function getClient() {
  const connectionString =
    process.env.DATABASE_URL ?? "postgres://placeholder:placeholder@localhost:5432/placeholder";
  if (!global.__ekSafarPgClient) {
    global.__ekSafarPgClient = postgres(connectionString, { max: 1 });
  }
  return global.__ekSafarPgClient;
}

export const db = drizzle(getClient(), { schema });
