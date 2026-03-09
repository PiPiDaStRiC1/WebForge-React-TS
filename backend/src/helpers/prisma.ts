import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const path = process.env["DATABASE_URL"];

const adapter = new PrismaBetterSqlite3({ url: path });

export const prisma = new PrismaClient({ adapter });
