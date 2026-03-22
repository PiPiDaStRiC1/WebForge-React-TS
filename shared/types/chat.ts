export interface Message {
    id?: number;
    text: string;
    timestamp?: Date;
    senderId: number;
}

export interface ChatPreview {
    id?: number;
    userName: string;
    userAvatar: { large: string; medium: string; thumbnail: string } | null;
    isOnline: boolean;
    lastMessage: Message;
}
