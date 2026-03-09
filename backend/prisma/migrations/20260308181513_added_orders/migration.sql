/*
  Warnings:

  - You are about to alter the column `earning` on the `Freelancer` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- CreateTable
CREATE TABLE "OrderSkill" (
    "skillId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    CONSTRAINT "OrderSkill_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("orderId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Order" (
    "orderId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "budgetMin" INTEGER NOT NULL,
    "budgetMax" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "deadlineDays" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" INTEGER NOT NULL,
    "freelancerId" INTEGER,
    CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "Freelancer" ("userId") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Freelancer" (
    "userId" INTEGER NOT NULL,
    "pricePerHour" INTEGER NOT NULL,
    "experience" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "earning" INTEGER NOT NULL,
    CONSTRAINT "Freelancer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Freelancer" ("category", "earning", "experience", "pricePerHour", "userId") SELECT "category", "earning", "experience", "pricePerHour", "userId" FROM "Freelancer";
DROP TABLE "Freelancer";
ALTER TABLE "new_Freelancer" RENAME TO "Freelancer";
CREATE UNIQUE INDEX "Freelancer_userId_key" ON "Freelancer"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
