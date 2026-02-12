import type { Message } from "@/types";

export const useMessages = () => {
    const getAllMessages = async () => {
        const raw = localStorage.getItem("chat-messages");

        if (!raw) {
            localStorage.setItem("chat-messages", JSON.stringify({}));
            return {};
        }

        try {
            const parsed = JSON.parse(raw) as Record<string, Message[]>;
            if (typeof parsed !== "object" || parsed === null) return {};
            return parsed;
        } catch (error) {
            console.error("Failed to parse messages from localStorage:", error);
            localStorage.setItem("chat-messages", JSON.stringify({}));
            return {};
        }
    };

    const getMessagesById = async (userId: number) => {
        const allMessages = await getAllMessages();

        const currentMessages = allMessages[userId] || [];
        return currentMessages;
    };

    const saveMessage = async (userId: number, message: Message) => {
        const allMessages = await getAllMessages();
        const currentMessages = allMessages[userId] || [];

        const updatedMessages = [...currentMessages, message];
        const newAllMessages = { ...allMessages, [userId]: updatedMessages };

        localStorage.setItem("chat-messages", JSON.stringify(newAllMessages));
    };

    const resetMessages = async (userId: number) => {
        const allMessages = await getAllMessages();

        //eslint-disable-next-line
        const { [userId]: _, ...restMessages } = allMessages;

        localStorage.setItem("chat-messages", JSON.stringify(restMessages));
    };

    return { getAllMessages, getMessagesById, saveMessage, resetMessages };
};
