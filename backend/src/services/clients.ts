import { clientsById, allClientsIds } from "@/data/users.json";
import { isClient } from "@shared/types/typeguards";
import { getIdOrThrow } from "@/helpers";
import type { Response, Request } from "express";
import type { Client, ClientResponse, ClientsResponse } from "@shared/types";
import type { ClientRequest } from "@/types";

const basedClients: Record<string, Client> = Object.fromEntries(
    (Object.values(clientsById) as Array<unknown>).filter(isClient).map((user) => [user.id, user]),
);

export const getAllClients = (_req: Request, res: Response<ClientsResponse>) => {
    res.status(200).json({
        status: true,
        data: { clientsById: basedClients, allIds: allClientsIds },
    });
};

export const getOneClient = (req: Request<ClientRequest>, res: Response<ClientResponse>) => {
    const id = req.params["clientId"];

    try {
        const client = getIdOrThrow(id, basedClients);
        res.status(200).json({ status: true, data: client });
    } catch (error) {
        res.status(404).json({ status: false, data: "Client not found" });
        return;
    }
};
