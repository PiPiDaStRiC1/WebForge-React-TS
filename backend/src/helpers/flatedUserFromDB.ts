import type { Freelancer, Client } from "@shared/types";

export const flatedUserFromDB = (user: any): Freelancer | Client | null => {
    if (user.role === "freelancer") {
        const { freelancer, password: _password, client: _, ...rest } = user;
        return {
            ...rest,
            gender: rest.gender as Freelancer["gender"],
            role: "freelancer",
            status: rest.status as Freelancer["status"],
            statusChat: rest.statusChat as Freelancer["statusChat"],
            registeredAt: rest.registeredAt.toISOString(),
            pricePerHour: freelancer?.pricePerHour ?? 1000,
            category: (freelancer?.category ?? "web-dev") as Freelancer["category"],
            earning: freelancer?.earning ?? 0,
            experience: freelancer?.experience ?? 0,
            skills:
                (freelancer?.skills as { name: string }[] | undefined)?.map((s) => s.name) ?? [],
            completedOrders: freelancer?.orders?.length ?? 0,
        };
    } else if (user.role === "client") {
        const { client, password: _password, freelancer: _, ...rest } = user;
        return {
            ...rest,
            gender: rest.gender as Client["gender"],
            role: "client",
            status: rest.status as Client["status"],
            statusChat: rest.statusChat as Client["statusChat"],
            registeredAt: rest.registeredAt.toISOString(),
            spending: client?.spending ?? 0,
        };
    } else {
        return null;
    }
};
