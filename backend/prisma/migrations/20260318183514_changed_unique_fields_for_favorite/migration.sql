/*
  Warnings:

  - A unique constraint covering the columns `[likedUserId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clientId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Favorite_likedUserId_key" ON "Favorite"("likedUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_clientId_key" ON "Favorite"("clientId");
