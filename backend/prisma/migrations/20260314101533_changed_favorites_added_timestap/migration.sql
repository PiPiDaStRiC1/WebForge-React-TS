/*
  Warnings:

  - You are about to drop the column `freelancerId` on the `Favorite` table. All the data in the column will be lost.
  - Added the required column `likedUserId` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Favorite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "likedUserId" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" INTEGER NOT NULL,
    CONSTRAINT "Favorite_likedUserId_fkey" FOREIGN KEY ("likedUserId") REFERENCES "Freelancer" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Favorite_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Favorite" ("clientId", "id") SELECT "clientId", "id" FROM "Favorite";
DROP TABLE "Favorite";
ALTER TABLE "new_Favorite" RENAME TO "Favorite";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
