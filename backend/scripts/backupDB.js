import fs from "fs";

const date = new Date().toISOString().split("T")[0];

fs.copyFileSync("prisma/dev.db", `prisma/dev.db.backup-${date}`);

console.log("Backup created:", date);
