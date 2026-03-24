-- CreateTable
CREATE TABLE "FavoriteOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "likedOrderId" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "freelancerId" INTEGER NOT NULL,
    CONSTRAINT "FavoriteOrder_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "Freelancer" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FavoriteOrder_likedOrderId_fkey" FOREIGN KEY ("likedOrderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteOrder_freelancerId_likedOrderId_key" ON "FavoriteOrder"("freelancerId", "likedOrderId");
