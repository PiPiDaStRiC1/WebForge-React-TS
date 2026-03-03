import { AuthStore } from "@/lib/storage/authStore";
import { useMemo } from "react";
import type { Message, AllUserLSData } from "@/types";

export const useMessages = () => {
    const authStore = useMemo(() => new AuthStore(), []);
    const currentUserId = authStore.getUserId();

    const getAllMessages = async () => {
        if (!currentUserId) return {};

        const raw = localStorage.getItem("users-data");
        if (!raw) return {};

        try {
            const allUsersData: Record<string, AllUserLSData> = JSON.parse(raw);
            return allUsersData[currentUserId]?.messages || {};
        } catch (error) {
            console.error("Failed to parse messages from localStorage:", error);
            return {};
        }
    };

    const getMessagesById = async (userId: number) => {
        const allMessages = await getAllMessages();

        const currentMessages = allMessages[userId] || [];
        return currentMessages;
    };

    const saveMessage = async (userId: number, message: Message) => {
        if (!currentUserId) {
            console.error("Cannot save message: user not authenticated");
            return;
        }

        const raw = localStorage.getItem("users-data");
        const allUsersData: Record<string, AllUserLSData> = raw ? JSON.parse(raw) : {};

        if (!allUsersData[currentUserId]) {
            allUsersData[currentUserId] = { messages: {}, favorites: {}, createdOrders: {} };
        }

        if (!allUsersData[currentUserId].messages) {
            allUsersData[currentUserId].messages = {};
        }

        const currentMessages = allUsersData[currentUserId].messages[userId] || [];
        allUsersData[currentUserId].messages[userId] = [...currentMessages, message];

        localStorage.setItem("users-data", JSON.stringify(allUsersData));
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
