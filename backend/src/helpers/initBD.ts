import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { prisma } from "./prisma";
import type { ClientsData, FreelancersData, OrdersData, ResponsesData } from "@shared/types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(__dirname, "../data/users.json"), "utf-8");

const rawOrders = readFileSync(join(__dirname, "../data/orders.json"), "utf-8");

const rawResponses = readFileSync(join(__dirname, "../data/orderResponses.json"), "utf-8");

const { clientsById, freelancersById } = JSON.parse(raw) as ClientsData & FreelancersData;
const { ordersById } = JSON.parse(rawOrders) as OrdersData;
const { responsesById } = JSON.parse(rawResponses) as ResponsesData;

const seed = async () => {
    console.log("Seeding clients...");
    for (const el of Object.values(clientsById)) {
        await prisma.user.upsert({
            where: { id: el.id },
            update: {
                name: el.name,
                bio: el.bio,
                rating: el.rating,
                status: el.status,
                statusChat: el.statusChat,
            },
            create: {
                id: el.id,
                name: el.name,
                email: el.email,
                role: "client",
                bio: el.bio,
                gender: el.gender,
                lastName: el.lastName,
                location: el.location,
                phone: el.phone,
                login: el.login,
                password: el.password ?? "",
                rating: el.rating,
                status: el.status,
                statusChat: el.statusChat,
                registeredAt: new Date(el.registeredAt),
                picture: el.picture
                    ? {
                          create: {
                              large: el.picture.large,
                              medium: el.picture.medium,
                              thumbnail: el.picture.thumbnail,
                          },
                      }
                    : undefined,
                client: { create: { spending: el.spending } },
            },
        });
    }

    console.log("Seeding freelancers...");
    for (const el of Object.values(freelancersById)) {
        await prisma.user.upsert({
            where: { id: el.id },
            update: {
                name: el.name,
                bio: el.bio,
                rating: el.rating,
                status: el.status,
                statusChat: el.statusChat,
            },
            create: {
                id: el.id,
                name: el.name,
                email: el.email,
                role: "freelancer",
                gender: el.gender,
                bio: el.bio,
                lastName: el.lastName,
                location: el.location,
                phone: el.phone,
                login: el.login,
                password: el.password ?? "",
                rating: el.rating,
                status: el.status,
                statusChat: el.statusChat,
                registeredAt: new Date(el.registeredAt),
                picture: el.picture
                    ? {
                          create: {
                              large: el.picture.large,
                              medium: el.picture.medium,
                              thumbnail: el.picture.thumbnail,
                          },
                      }
                    : undefined,
                freelancer: {
                    create: {
                        pricePerHour: el.pricePerHour,
                        experience: el.experience,
                        category: el.category,
                        earning: el.earning,
                        skills: { create: el.skills.map((name) => ({ name })) },
                    },
                },
            },
        });
    }

    for (const el of Object.values(ordersById)) {
        await prisma.order.upsert({
            where: { id: el.id },
            update: {
                title: el.title,
                description: el.description,
                budgetMin: el.budgetMin,
                budgetMax: el.budgetMax,
                category: el.category,
                status: el.status,
                deadlineDays: el.deadline,
                createdAt: new Date(el.createdAt),
            },
            create: {
                id: el.id,
                title: el.title,
                description: el.description,
                budgetMin: el.budgetMin,
                budgetMax: el.budgetMax,
                category: el.category,
                status: el.status,
                deadlineDays: el.deadline,
                createdAt: new Date(el.createdAt),
                clientId: el.clientId,
                completedById: el.completedById,
                skills: { create: el.skills.map((name) => ({ name })) },
            },
        });
    }

    console.log("Seeding responses...");
    for (const el of Object.values(responsesById)) {
        await prisma.response.upsert({
            where: { id: el.id },
            update: {},
            create: {
                id: el.id,
                orderId: el.orderId,
                freelancerId: el.freelancerId,
                text: el.text,
                createdAt: new Date(el.createdAt),
            },
        });
    }

    console.log("Done!");
    await prisma.$disconnect();
};

seed().catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
