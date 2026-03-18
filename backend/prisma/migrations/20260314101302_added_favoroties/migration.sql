-- CreateTable
CREATE TABLE "Favorite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "freelancerId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    CONSTRAINT "Favorite_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "Freelancer" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Favorite_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);

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
    CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Order_completedById_fkey" FOREIGN KEY ("completedById") REFERENCES "Freelancer" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("budgetMax", "budgetMin", "category", "clientId", "completedById", "createdAt", "deadlineDays", "description", "id", "status", "title") SELECT "budgetMax", "budgetMin", "category", "clientId", "completedById", "createdAt", "deadlineDays", "description", "id", "status", "title" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_Response" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "freelancerId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    CONSTRAINT "Response_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "Freelancer" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Response_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Response" ("createdAt", "freelancerId", "id", "orderId", "text") SELECT "createdAt", "freelancerId", "id", "orderId", "text" FROM "Response";
DROP TABLE "Response";
ALTER TABLE "new_Response" RENAME TO "Response";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
