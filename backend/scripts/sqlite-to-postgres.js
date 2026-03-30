import "dotenv/config";
import Database from "better-sqlite3";
import { prisma } from "../src/helpers/prisma.ts";

const sqliteDbPath = "./prisma/dev.db.backup-2026-03-28";
console.log(`Connecting to SQLite: ${sqliteDbPath}`);

const db = new Database(sqliteDbPath, { readonly: true });

async function main() {
    console.log("Starting data migration to Postgres...");

    // Helper to map date strings to Date objects
    const mapDates = (rows, dateFields) => {
        return rows.map((row) => {
            const newRow = { ...row };
            for (const field of dateFields) {
                if (newRow[field]) {
                    newRow[field] = new Date(newRow[field]);
                }
            }
            return newRow;
        });
    };

    try {
        // 1. User
        const users = db.prepare("SELECT * FROM User").all();
        console.log(`Migrating ${users.length} Users...`);
        await prisma.user.createMany({
            data: mapDates(users, ["registeredAt"]),
            skipDuplicates: true,
        });

        // 2. Client
        const clients = db.prepare("SELECT * FROM Client").all();
        console.log(`Migrating ${clients.length} Clients...`);
        await prisma.client.createMany({ data: clients, skipDuplicates: true });

        // 3. Freelancer
        const freelancers = db.prepare("SELECT * FROM Freelancer").all();
        console.log(`Migrating ${freelancers.length} Freelancers...`);
        await prisma.freelancer.createMany({ data: freelancers, skipDuplicates: true });

        // 4. Picture
        const pictures = db.prepare("SELECT * FROM Picture").all();
        console.log(`Migrating ${pictures.length} Pictures...`);
        await prisma.picture.createMany({ data: pictures, skipDuplicates: true });

        // 5. Chat
        const chats = db.prepare("SELECT * FROM Chat").all();
        console.log(`Migrating ${chats.length} Chats...`);
        await prisma.chat.createMany({ data: chats, skipDuplicates: true });

        // 6. Message
        const messages = db.prepare("SELECT * FROM Message").all();
        console.log(`Migrating ${messages.length} Messages...`);
        await prisma.message.createMany({
            data: mapDates(messages, ["timestamp"]),
            skipDuplicates: true,
        });

        // 7. Order
        const orders = db.prepare('SELECT * FROM "Order"').all(); // Escaped because Order is a reserved keyword in some contexts, strictly speaking Prisma names it "Order"
        console.log(`Migrating ${orders.length} Orders...`);
        await prisma.order.createMany({
            data: mapDates(orders, ["createdAt"]),
            skipDuplicates: true,
        });

        // 8. FreelancerSkill
        const freelancerSkills = db.prepare("SELECT * FROM FreelancerSkill").all();
        console.log(`Migrating ${freelancerSkills.length} FreelancerSkills...`);
        await prisma.freelancerSkill.createMany({ data: freelancerSkills, skipDuplicates: true });

        // 9. OrderSkill
        const orderSkills = db.prepare("SELECT * FROM OrderSkill").all();
        console.log(`Migrating ${orderSkills.length} OrderSkills...`);
        await prisma.orderSkill.createMany({ data: orderSkills, skipDuplicates: true });

        // 10. Response
        const responses = db.prepare("SELECT * FROM Response").all();
        console.log(`Migrating ${responses.length} Responses...`);
        await prisma.response.createMany({
            data: mapDates(responses, ["createdAt"]),
            skipDuplicates: true,
        });

        // 11. Favorite
        const favorites = db.prepare("SELECT * FROM Favorite").all();
        console.log(`Migrating ${favorites.length} Favorites...`);
        await prisma.favorite.createMany({
            data: mapDates(favorites, ["timestamp"]),
            skipDuplicates: true,
        });

        // 12. FavoriteOrder
        const favoriteOrders = db.prepare("SELECT * FROM FavoriteOrder").all();
        console.log(`Migrating ${favoriteOrders.length} FavoriteOrders...`);
        await prisma.favoriteOrder.createMany({
            data: mapDates(favoriteOrders, ["timestamp"]),
            skipDuplicates: true,
        });

        // Update sequences for PostgreSQL (since createMany with explicit IDs doesn't update the auto-increment sequences)
        console.log("Updating PostgreSQL sequence values...");
        await prisma.$executeRawUnsafe(
            `SELECT setval('"User_id_seq"', (SELECT MAX(id) FROM "User"));`,
        );
        await prisma.$executeRawUnsafe(
            `SELECT setval('"Picture_pictureId_seq"', (SELECT MAX("pictureId") FROM "Picture"));`,
        );
        await prisma.$executeRawUnsafe(
            `SELECT setval('"Chat_id_seq"', (SELECT MAX(id) FROM "Chat"));`,
        );
        await prisma.$executeRawUnsafe(
            `SELECT setval('"Message_id_seq"', (SELECT MAX(id) FROM "Message"));`,
        );
        await prisma.$executeRawUnsafe(
            `SELECT setval('"Order_id_seq"', (SELECT MAX(id) FROM "Order"));`,
        );
        await prisma.$executeRawUnsafe(
            `SELECT setval('"FreelancerSkill_skillId_seq"', (SELECT MAX("skillId") FROM "FreelancerSkill"));`,
        );
        await prisma.$executeRawUnsafe(
            `SELECT setval('"OrderSkill_skillId_seq"', (SELECT MAX("skillId") FROM "OrderSkill"));`,
        );
        await prisma.$executeRawUnsafe(
            `SELECT setval('"Response_id_seq"', (SELECT MAX(id) FROM "Response"));`,
        );
        await prisma.$executeRawUnsafe(
            `SELECT setval('"Favorite_id_seq"', (SELECT MAX(id) FROM "Favorite"));`,
        );
        await prisma.$executeRawUnsafe(
            `SELECT setval('"FavoriteOrder_id_seq"', (SELECT MAX(id) FROM "FavoriteOrder"));`,
        );

        console.log("✅ Migration finished successfully!");
    } catch (err) {
        console.error("❌ Migration failed:", err);
    } finally {
        db.close();
        await prisma.$disconnect();
    }
}

main();
