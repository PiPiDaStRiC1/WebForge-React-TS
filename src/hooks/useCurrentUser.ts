import { AuthStore } from "@/lib/storage/authStore";
import { useQuery } from "@tanstack/react-query";
import { fetchAllFreelancers, fetchAllClients } from "@/lib/api";
import type { UserData, FreelancersData, ClientsData } from "@/types";

export const useCurrentUser = () => {
    const authStore = new AuthStore();
    const userId = authStore.getUserId();

    const { data: freelancers } = useQuery<FreelancersData>({
        queryKey: ["freelancers"],
        queryFn: fetchAllFreelancers,
    });
    const { data: clients } = useQuery<ClientsData>({
        queryKey: ["clients"],
        queryFn: fetchAllClients,
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
