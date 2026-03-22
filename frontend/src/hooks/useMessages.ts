import { useUser } from "./useUser";
import { apiClient } from "@/lib/api";
import type { Message, AllUserLSData } from "@shared/types";

export const useMessages = () => {
    const { user } = useUser();
    const currentUserId = user?.id;

    const getAllMessages = async () => {
        try {
            const chats = await apiClient.getAllChatsMe();

            return chats;
        } catch (error) {
            console.error("Failed to fetch messages from API:", error);
            return {};
        }

        // if (!currentUserId) return {};

        // const raw = localStorage.getItem("users-data");
        // if (!raw) return {};

        // try {
        //     const allUsersData: Record<string, AllUserLSData> = JSON.parse(raw);
        //     return allUsersData[currentUserId]?.messages || {};
        // } catch (error) {
        //     console.error("Failed to parse messages from localStorage:", error);
        //     return {};
        // }
    };

    const getMessagesById = async (userId: number) => {
        const allMessages = await getAllMessages();

        const currentMessages = allMessages[userId] || [];
        return currentMessages;
    };

    const saveMessage = async (userId: number, message: Message) => {
        try {
            await apiClient.postSingleMessage(userId, message);
        } catch (error) {
            console.error("Failed to save message:", error);
            return;
        }

        // if (!currentUserId) {
        //     console.error("Cannot save message: user not authenticated");
        //     return;
        // }

        // const raw = localStorage.getItem("users-data");
        // const allUsersData: Record<string, AllUserLSData> = raw ? JSON.parse(raw) : {};

        // if (!allUsersData[currentUserId]) {
        //     allUsersData[currentUserId] = { messages: {}, favorites: {}, createdOrders: {} };
        // }

        // if (!allUsersData[currentUserId].messages) {
        //     allUsersData[currentUserId].messages = {};
        // }

        // const currentMessages = allUsersData[currentUserId].messages[userId] || [];
        // allUsersData[currentUserId].messages[userId] = [...currentMessages, message];

        // localStorage.setItem("users-data", JSON.stringify(allUsersData));
    };

    const resetMessages = async (userId: number) => {
        if (!currentUserId) return;

        const raw = localStorage.getItem("users-data");
        const allUsersData: Record<string, AllUserLSData> = raw ? JSON.parse(raw) : {};

        if (allUsersData[currentUserId]?.messages?.[userId]) {
            delete allUsersData[currentUserId].messages[userId];
            localStorage.setItem("users-data", JSON.stringify(allUsersData));
        }
    };

    return { getAllMessages, getMessagesById, saveMessage, resetMessages };
};
