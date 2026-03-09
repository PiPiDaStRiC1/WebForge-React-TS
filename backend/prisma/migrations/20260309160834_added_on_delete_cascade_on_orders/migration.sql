-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderSkill" (
    "skillId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT '',
    "orderId" INTEGER NOT NULL,
    CONSTRAINT "OrderSkill_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_OrderSkill" ("name", "orderId", "skillId") SELECT "name", "orderId", "skillId" FROM "OrderSkill";
DROP TABLE "OrderSkill";
ALTER TABLE "new_OrderSkill" RENAME TO "OrderSkill";
CREATE TABLE "new_Response" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "freelancerId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    CONSTRAINT "Response_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "Freelancer" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Response_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Response" ("createdAt", "freelancerId", "id", "orderId", "text") SELECT "createdAt", "freelancerId", "id", "orderId", "text" FROM "Response";
DROP TABLE "Response";
ALTER TABLE "new_Response" RENAME TO "Response";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
