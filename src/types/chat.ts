export interface Message {
    id: string;
    text: string;
    timestamp: string;
    senderId: number;
    isRead: boolean;
}

export interface ChatPreview {
    id: string;
    userName: string;
    userAvatar: {large: string; medium: string; thumbnail: string} | null;
    isOnline: boolean;
    lastMessage: Message;
}
