import { apiClient } from "@/lib/api";
import type { Message } from "@shared/types";

const normalizeMessage = (message: Message): Message => {
    const parsedTimestamp =
        message.timestamp instanceof Date
            ? message.timestamp
            : message.timestamp
              ? new Date(message.timestamp)
              : new Date();

    return {
        ...message,
        timestamp: Number.isNaN(parsedTimestamp.getTime()) ? new Date() : parsedTimestamp,
    };
};

export const useMessages = () => {
    const getAllMessages = async () => {
        try {
            const chats = await apiClient.getAllChatsMe();

            return Object.fromEntries(
                Object.entries(chats).map(([collId, messages]) => [
                    collId,
                    messages.map((message) => normalizeMessage(message)),
                ]),
            );
        } catch (error) {
            console.error("Failed to fetch messages from API:", error);
            return {};
        }
    };

    const getMessagesById = async (userId: number) => {
        try {
            const chat = await apiClient.getSingleChat(userId);
            return chat.map((message) => normalizeMessage(message));
        } catch (error) {
            console.error("Failed to fetch messages from API:", error);
            return [];
        }
    };

    const saveMessage = async (userId: number, message: Message) => {
        try {
            await apiClient.postSingleMessage(userId, message);
        } catch (error) {
            console.error("Failed to save message:", error);
            return;
        }
    };

    const resetMessages = async (userId: number) => {
        try {
            await apiClient.deleteSingleChat(userId);
        } catch (error) {
            console.error("Failed to delete messages:", error);
            return;
        }
    };

    return { getAllMessages, getMessagesById, saveMessage, resetMessages };
};
