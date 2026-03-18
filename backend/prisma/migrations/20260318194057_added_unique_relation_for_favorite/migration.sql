/*
  Warnings:

  - A unique constraint covering the columns `[clientId,likedUserId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Favorite_clientId_likedUserId_key" ON "Favorite"("clientId", "likedUserId");
