export type MessageSenderType = "user" | "bot";

export interface Message {
    id?: number;
    text: string;
    timestamp?: Date | string;
    senderId: number;
    senderType?: MessageSenderType;
}

export interface ChatPreviewWithoutLastMessage {
    id: number;
    name: string;
    picture: { large: string; medium: string; thumbnail: string } | null;
    statusChat: "offline" | "online";
}

export interface ChatPreview {
    id: number;
    name: string;
    picture: { large: string; medium: string; thumbnail: string } | null;
    statusChat: "offline" | "online";
    lastMessage: Message;
}
