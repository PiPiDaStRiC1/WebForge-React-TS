import type { Response, Request } from "express";
import { prisma } from "@/helpers";
import type { ClientResponse, ClientsResponse, Client } from "@shared/types";
import type { ClientRequest } from "@/types";

export const getAllClients = async (_req: Request, res: Response<ClientsResponse>) => {
    try {
        const clients = await prisma.user.findMany({
            where: { role: "client" },
            include: {
                client: true,
                picture: { select: { large: true, medium: true, thumbnail: true } },
            },
        });

        const flatClientsById = Object.fromEntries(
            clients.map((client) => {
                const { client: ClientData, ...rest } = client;

                const flatClient: Client = {
                    ...rest,
                    gender: rest.gender as Client["gender"],
                    role: "client" as const,
                    status: rest.status as Client["status"],
                    statusChat: rest.statusChat as Client["statusChat"],
                    registeredAt: rest.registeredAt.toISOString(),
                    spending: ClientData?.spending ?? 0,
                };
                return [client.id, flatClient];
            }),
        );
        const allIds = clients.map((client) => client.id);

        res.status(200).json({ success: true, data: { clientsById: flatClientsById, allIds } });
    } catch (error) {
        res.status(500).json({ success: false, data: "Internal Server Error" });
    }
};

export const getOneClient = async (req: Request<ClientRequest>, res: Response<ClientResponse>) => {
    const id = Number(req.params["clientId"]);

    try {
        const client = await prisma.user.findFirstOrThrow({
            where: { id: id, role: "client" },
            include: {
                client: true,
                picture: { select: { large: true, medium: true, thumbnail: true } },
            },
        });

        const { client: ClientData, ...rest } = client;

        const flatClient: Client = {
            ...rest,
            gender: rest.gender as Client["gender"],
            role: "client" as const,
            status: rest.status as Client["status"],
            statusChat: rest.statusChat as Client["statusChat"],
            registeredAt: rest.registeredAt.toISOString(),
            spending: ClientData?.spending ?? 0,
        };

        res.status(200).json({ success: true, data: flatClient });
    } catch (error) {
        res.status(404).json({ success: false, data: "Client not found" });
        return;
    }
};
