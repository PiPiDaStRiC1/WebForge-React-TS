export type MessageSenderType = "user" | "bot";

export interface Message {
    id?: number;
    text: string;
    timestamp?: Date | string;
    senderId: number;
    senderType?: MessageSenderType;
}

export interface ChatPreview {
    id: number;
    userName: string;
    userAvatar: { large: string; medium: string; thumbnail: string } | null;
    isOnline: boolean;
    lastMessage: Message;
}
