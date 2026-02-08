import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/hooks";
import { Search, ArrowLeft, X, ArrowRight, MessageCircle } from "lucide-react";
import { useMessages } from "@/hooks";
import { fetchAllFreelancers } from "@/lib/api/fetchAllFreelancers";
import { fetchAllClients } from "@/lib/api/fetchAllClients";
import { SkeletonChats } from "./SkeletonChats";
import { InlineMessage } from "@/components/ui/Chat/index";
import type { Message, FreelancersData, ClientsData, ChatPreview } from "@/types";

export const Chats = () => {
    const { user } = useUser();
    const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

    const { getAllMessages } = useMessages();
    const [selectedChat, setSelectedChat] = useState<ChatPreview | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const ownUserId = useMemo(() => user?.id ?? 0, [user?.id]);

    const { data: messages, isLoading: isLoadingMessages } = useQuery<Record<string, Message[]>>({
        queryKey: ["messages"],
        queryFn: getAllMessages,
        staleTime: 0,
    });
    const { data: freelancers, isLoading: isLoadingFreelancers } = useQuery<FreelancersData>({
        queryKey: ["freelancers"],
        queryFn: fetchAllFreelancers,
        staleTime: 5 * 60 * 1000,
    });
    const { data: clients, isLoading: isLoadingClients } = useQuery<ClientsData>({
        queryKey: ["clients"],
        queryFn: fetchAllClients,
        staleTime: 5 * 60 * 1000,
    });

    const collocutorIds = Object.keys(messages || {});

    const chatPreviews: ChatPreview[] = useMemo(() => {
        if (!messages || !freelancers || !clients) return [];

        const allUsers = { ...freelancers.freelancersById, ...clients.clientsById };

        return collocutorIds
            .map((colloId) => {
                const userData = allUsers[colloId];
                if (!userData) return null;

                const lastMessage = messages[colloId].slice(-1)[0];

                return {
                    id: colloId,
                    userName: userData.name,
                    userAvatar: userData.picture,
                    isOnline: userData.status === "online",
                    lastMessage,
                };
            })
            .filter((chat): chat is ChatPreview => chat !== null);
    }, [collocutorIds, freelancers, clients, messages]);

    const filteredChats = useMemo(
        () =>
            chatPreviews.filter((chat) =>
                chat.userName.toLowerCase().includes(searchQuery.toLowerCase()),
            ),
        [chatPreviews, searchQuery],
    );

    if (isLoadingFreelancers || isLoadingClients || isLoadingMessages) {
        return <SkeletonChats />;
    }

    const currentMessages = selectedChat ? (messages?.[selectedChat.id] ?? []) : [];

    return (
        <section className="relative -mt-10">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 h-[calc(100vh-300px)] min-h-[600px]">
                        <div
                            className={`lg:col-span-4 border-r border-gray-200 flex flex-col ${isMobileChatOpen ? "hidden lg:flex" : "flex"}`}
                        >
                            <div className="p-4 border-b border-gray-200 bg-white/50">
                                <div className="relative">
                                    <Search
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                        size={18}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Поиск чатов..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                                {filteredChats.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center text-gray-500 px-4">
                                        <MessageCircle size={48} className="mb-3 opacity-30" />
                                        <p className="text-sm text-center">Чаты не найдены</p>
                                    </div>
                                ) : (
                                    filteredChats.map((chat) => (
                                        <button
                                            key={chat.id}
                                            onClick={() => {
                                                setSelectedChat(chat);
                                                setIsMobileChatOpen(true);
                                            }}
                                            className={`w-full p-4 flex items-start gap-3 hover:bg-indigo-50/50 transition-colors border-b border-gray-100 ${
                                                selectedChat?.id === chat.id
                                                    ? "bg-indigo-50/70"
                                                    : "bg-white/30"
                                            }`}
                                        >
                                            {chat.userAvatar ? (
                                                <>
                                                    <Link to={`/profile/${chat.id}`}>
                                                        <img
                                                            src={chat.userAvatar?.medium}
                                                            alt={chat.userName}
                                                            className="w-12 h-12 rounded-full object-cover"
                                                        />
                                                        {chat.isOnline && (
                                                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                                                        )}
                                                    </Link>
                                                </>
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                                                    {chat.userName?.charAt(0).toUpperCase() || "U"}
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0 text-left">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h3 className="font-semibold text-gray-900 truncate text-sm">
                                                        {chat.userName}
                                                    </h3>
                                                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                                                        {chat.lastMessage.timestamp}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm text-gray-600 truncate pr-2">
                                                        {chat.lastMessage.text}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>

                        <div
                            className={`lg:col-span-8 flex flex-col ${!isMobileChatOpen ? "hidden lg:flex" : "flex"}`}
                        >
                            {selectedChat ? (
                                <>
                                    <div className="p-4 border-b border-gray-200 bg-white/50 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setIsMobileChatOpen(false)}
                                                className="lg:hidden text-gray-600 hover:text-gray-900"
                                            >
                                                <ArrowLeft size={20} />
                                            </button>
                                            {selectedChat.userAvatar ? (
                                                <>
                                                    <Link to={`/profile/${selectedChat.id}`}>
                                                        <img
                                                            src={selectedChat.userAvatar?.medium}
                                                            alt={selectedChat.userName}
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                        {selectedChat.isOnline && (
                                                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                                                        )}
                                                    </Link>
                                                </>
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                                                    {selectedChat.userName
                                                        ?.charAt(0)
                                                        .toUpperCase() || "U"}
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="font-semibold text-gray-900 text-sm">
                                                    {selectedChat.userName}
                                                </h3>
                                                <p className="text-xs text-gray-500">
                                                    {selectedChat.isOnline ? "В сети" : "Не в сети"}
                                                </p>
                                            </div>
                                        </div>
                                        <Link
                                            to={`/messages/${selectedChat.id}`}
                                            className="flex items-center gap-2"
                                        >
                                            <span className="text-gray-600 hover:text-gray-900">
                                                Открыть чат
                                            </span>
                                            <ArrowRight size={15} />
                                        </Link>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50/30 to-white/30">
                                        {currentMessages.map((message) => {
                                            return (
                                                <InlineMessage
                                                    key={message.id}
                                                    message={message}
                                                    currentUser={{
                                                        id: Number(selectedChat.id),
                                                        name: selectedChat.userName,
                                                        picture: selectedChat.userAvatar,
                                                    }}
                                                    ownUserId={ownUserId}
                                                />
                                            );
                                        })}
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                                    <MessageCircle size={64} className="mb-4 opacity-20" />
                                    <p className="text-lg font-medium">Выберите чат</p>
                                    <p className="text-sm">Выберите диалог из списка слева</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
