-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderSkill" (
    "skillId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT '',
    "orderId" INTEGER NOT NULL,
    CONSTRAINT "OrderSkill_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderSkill" ("name", "orderId", "skillId") SELECT "name", "orderId", "skillId" FROM "OrderSkill";
DROP TABLE "OrderSkill";
ALTER TABLE "new_OrderSkill" RENAME TO "OrderSkill";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
