import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { useUser } from "./useUser";
import type { UserData, FreelancersData, ClientsData } from "@shared/types";

export const useCurrentUser = () => {
    const { user } = useUser();
    const userId = user?.id;

    const { data: freelancers } = useQuery<FreelancersData>({
        queryKey: ["freelancers"],
        queryFn: apiClient.getAllFreelancers,
    });
    const { data: clients } = useQuery<ClientsData>({
        queryKey: ["clients"],
        queryFn: apiClient.getAllClients,
    });

    return useQuery<UserData | null>({
        queryKey: ["currentUser"],
        queryFn: async () => {
            if (!userId || !freelancers || !clients) {
                return null;
            }

            const allUsers = { ...freelancers.freelancersById, ...clients.clientsById };
            return allUsers[userId] || null;
        },
        enabled: !!freelancers && !!clients && !!userId,
        staleTime: 30 * 60 * 1000,
    });
};
