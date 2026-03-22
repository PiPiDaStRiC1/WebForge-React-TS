import { useState, useRef, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useMessages, useUser } from "@/hooks";
import { Send, MoreVertical, ArrowLeft, MessageCircle, Star } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { InlineMessage } from "@/components/ui";
import type { Message, UserData } from "@shared/types";
import toast from "react-hot-toast";

const Chat = () => {
    const { userId } = useParams<{ userId: string }>();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { user: ownUser } = useUser();
    const { getMessagesById, saveMessage, resetMessages } = useMessages();
    const [openMore, setOpenMore] = useState(false);
    const moreOptionsRef = useRef<HTMLDivElement>(null);
    const offlineTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const ownUserId = useMemo(() => ownUser?.id ?? 0, [ownUser?.id]);

    const {
        data: currentUser,
        isError,
        isLoading,
    } = useQuery<UserData | undefined>({
        queryKey: ["user", userId],
        queryFn: () => apiClient.getSingleUser(Number(userId)),
        staleTime: 5 * 60 * 1000,
        enabled: !!userId,
    });
    const { data: messages } = useQuery<Message[]>({
        queryKey: ["messages", userId],
        queryFn: () => getMessagesById(Number(userId)),
        staleTime: 2 * 1000,
        refetchInterval: 2 * 1000,
        refetchIntervalInBackground: true,
        enabled: !!userId,
    });
    const { mutate } = useMutation({
        mutationKey: ["sendMessage"],
        onMutate: async (messageText: string) => {
            // race conditions
            await queryClient.cancelQueries({ queryKey: ["messages", userId] });
            await queryClient.cancelQueries({ queryKey: ["user", userId] });

            const previousMessages = queryClient.getQueryData<Message[]>(["messages", userId]);
            const previousUser = queryClient.getQueryData<UserData>(["user", userId]);

            if (offlineTimerRef.current) {
                clearTimeout(offlineTimerRef.current);
                offlineTimerRef.current = null;
            }

            const optimisticMessage: Message = {
                text: messageText,
                senderId: ownUserId,
                timestamp: new Date(),
                senderType: "user",
            };

            queryClient.setQueryData<UserData | undefined>(
                ["user", userId],
                (prevData: UserData | undefined) => {
                    if (!prevData) return prevData;
                    return { ...prevData, statusChat: "online" };
                },
            );

            queryClient.setQueriesData(
                { queryKey: ["messages", userId] },
                (prevData: Message[] | undefined) => {
                    if (!prevData) return [optimisticMessage];
                    return [...prevData, optimisticMessage];
                },
            );

            return { previousMessages, previousUser }; // context -> onError, onSuccess
        },
        mutationFn: async (messageText: string) => {
            const newMessage: Message = {
                text: messageText,
                senderId: ownUserId,
                timestamp: new Date(),
                senderType: "user",
            };
            await saveMessage(Number(userId), newMessage);

            return newMessage;
        },
        onError: (_err, _value, context) => {
            if (offlineTimerRef.current) {
                clearTimeout(offlineTimerRef.current);
                offlineTimerRef.current = null;
            }

            if (context) {
                queryClient.setQueryData(["messages", userId], context.previousMessages); // rollback
                queryClient.setQueryData(["user", userId], context.previousUser); // rollback
            }
        },
        onSuccess: () => {
            if (offlineTimerRef.current) {
                clearTimeout(offlineTimerRef.current);
            }

            offlineTimerRef.current = setTimeout(() => {
                queryClient.setQueryData<UserData | undefined>(
                    ["user", userId],
                    (prevData: UserData | undefined) => {
                        if (!prevData) return prevData;
                        return { ...prevData, statusChat: "offline" };
                    },
                );
            }, 15000); // set user offline after 15 seconds of inactivity
        },
    });
    const [messageText, setMessageText] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleClear = async () => {
        queryClient.setQueryData(["messages", userId], []);
        await resetMessages(Number(userId));
        toast.success("Все сообщения удалены");
        setOpenMore(false);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageText.trim()) return;
        mutate(messageText);
        setMessageText("");
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (moreOptionsRef.current && !moreOptionsRef.current.contains(event.target as Node)) {
                setOpenMore(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        return () => {
            if (offlineTimerRef.current) {
                clearTimeout(offlineTimerRef.current);
            }
        };
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <MessageCircle size={64} className="mx-auto mb-4 text-gray-300 animate-pulse" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Загрузка...</h2>
                    <p className="text-gray-600 mb-6">Пожалуйста, подождите</p>
                </div>
            </div>
        );
    }

    if (!userId || !currentUser || isError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <MessageCircle size={64} className="mx-auto mb-4 text-gray-300" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Пользователь не найден
                    </h2>
                    <p className="text-gray-600 mb-6">Проверьте правильность ссылки</p>
                    <Link
                        to="/messages"
                        className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                    >
                        Вернуться к чатам
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 py-6">
            <div className="max-w-5xl mx-auto px-4">
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-t-2xl shadow-lg px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
                            >
                                <ArrowLeft size={20} className="text-gray-600" />
                            </button>

                            <Link to={`/profile/${currentUser.id}`} className="relative">
                                {currentUser.picture ? (
                                    <img
                                        src={currentUser.picture.medium}
                                        alt={currentUser.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                                        {currentUser.name?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                )}
                                {currentUser.statusChat === "online" && (
                                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                                )}
                            </Link>

                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="font-semibold text-gray-900 text-lg">
                                        {currentUser.name}
                                    </h2>
                                    <div className="flex items-center gap-1 text-amber-500">
                                        <Star size={14} fill="currentColor" />
                                        <span className="text-sm font-medium text-gray-700">
                                            {currentUser.rating}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500">
                                    {currentUser.statusChat === "online"
                                        ? "В сети"
                                        : "Был(а) недавно"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 relative" ref={moreOptionsRef}>
                            <button
                                className="cursor-pointer p-2.5 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 rounded-lg transition-colors"
                                onClick={() => setOpenMore(!openMore)}
                            >
                                <MoreVertical size={20} />
                            </button>
                            {openMore && (
                                <div className="absolute flex flex-col top-12 right-0 bg-white rounded-lg shadow-lg w-48 z-9999">
                                    <button
                                        className="cursor-pointer w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                                        onClick={handleClear}
                                    >
                                        Очистить историю
                                    </button>
                                    <Link
                                        to="/messages"
                                        className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                                    >
                                        Вернуться к чатам
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="border-x border-gray-200 h-[30rem] overflow-y-auto py-6 px-6">
                    <div className="space-y-4">
                        {!messages || messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <MessageCircle size={48} className="mb-3 opacity-30" />
                                <p className="text-sm">Начните диалог с исполнителем</p>
                            </div>
                        ) : (
                            <>
                                {messages.map((message) => (
                                    <InlineMessage
                                        key={message.id}
                                        message={message}
                                        currentUser={currentUser}
                                        ownUserId={ownUserId}
                                    />
                                ))}
                                <div ref={messagesEndRef} />
                            </>
                        )}
                    </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-b-2xl shadow-lg px-6 py-4">
                    <form onSubmit={handleSendMessage} className="flex items-start gap-3">
                        <div className="flex-1 relative">
                            <textarea
                                autoFocus
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                placeholder="Напишите сообщение..."
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage(e);
                                    }
                                }}
                                className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white transition-all resize-none text-[15px] max-h-32"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!messageText.trim()}
                            className="p-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none transition-all flex-shrink-0"
                        >
                            <Send size={20} />
                        </button>
                    </form>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        Enter для отправки • Shift + Enter для новой строки
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Chat;
