import {getAllClients} from "@/lib/storage/dataStore";
import type {ClientsData} from "@/types";

export async function fetchAllClients(): Promise<ClientsData> {
    await new Promise<boolean>((resolve) => {
        setTimeout(() => resolve(true), 300);
    });
    const {clientsById, allIds} = getAllClients();

    return {clientsById, allIds};
}
