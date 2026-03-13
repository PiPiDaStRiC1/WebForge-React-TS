-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "userId" INTEGER NOT NULL,
    "spending" INTEGER NOT NULL,
    CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("spending", "userId") SELECT "spending", "userId" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_userId_key" ON "Client"("userId");
CREATE TABLE "new_Freelancer" (
    "userId" INTEGER NOT NULL,
    "pricePerHour" INTEGER NOT NULL,
    "experience" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "earning" INTEGER NOT NULL,
    CONSTRAINT "Freelancer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Freelancer" ("category", "earning", "experience", "pricePerHour", "userId") SELECT "category", "earning", "experience", "pricePerHour", "userId" FROM "Freelancer";
DROP TABLE "Freelancer";
ALTER TABLE "new_Freelancer" RENAME TO "Freelancer";
CREATE UNIQUE INDEX "Freelancer_userId_key" ON "Freelancer"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
