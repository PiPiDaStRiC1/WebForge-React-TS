/*
  Warnings:

  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `freelancerId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "budgetMin" INTEGER NOT NULL,
    "budgetMax" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "deadlineDays" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" INTEGER NOT NULL,
    "completedById" INTEGER,
    CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_completedById_fkey" FOREIGN KEY ("completedById") REFERENCES "Freelancer" ("userId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("budgetMax", "budgetMin", "category", "clientId", "createdAt", "deadlineDays", "description", "status", "title") SELECT "budgetMax", "budgetMin", "category", "clientId", "createdAt", "deadlineDays", "description", "status", "title" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_OrderSkill" (
    "skillId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    CONSTRAINT "OrderSkill_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderSkill" ("name", "orderId", "skillId") SELECT "name", "orderId", "skillId" FROM "OrderSkill";
DROP TABLE "OrderSkill";
ALTER TABLE "new_OrderSkill" RENAME TO "OrderSkill";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
