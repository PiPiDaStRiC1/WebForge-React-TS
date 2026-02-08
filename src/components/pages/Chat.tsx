import { useState, useRef, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useMessages, useUser } from "@/hooks";
import { Send, Paperclip, MoreVertical, ArrowLeft, MessageCircle, Star } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchOneUser } from "@/lib/api/fetchOneUser";
import { InlineMessage } from "@/components/ui";
import type { Message } from "@/types";

const freelancerReplies: string[] = [
    "Привет! Да, конечно, могу помочь — расскажите чуть подробнее, что именно нужно сделать 🙂",
    "Спасибо за сообщение! Сейчас посмотрю и отвечу более конкретно.",
    "Понял задачу. Уточню пару моментов, чтобы сделать всё правильно.",
    "Да, это реализуемо. Могу предложить несколько вариантов решения — зависит от ваших приоритетов.",
    "Супер, звучит понятно. Давайте уточним сроки и желаемый результат.",
    "Ок, принял. Подскажите, есть ли примеры/референсы того, как должно выглядеть?",
    "Да, могу взяться. Скажите, это срочно или можно спокойно в течение нескольких дней?",
    "Я правильно понимаю, что нужно сделать именно вот так?",
    "Хорошо, давайте согласуем детали, чтобы не было расхождений по ожиданиям.",
    "Отлично, я готов начать. Подтвердите, пожалуйста, что всё актуально.",
    "Да, конечно. Обычно это занимает примерно X времени, но точнее скажу после уточнений.",
    "Я могу сделать это под ключ, включая тестирование и правки.",
    "Скорее всего это несложно, но хочу уточнить один момент по логике.",
    "Если есть ТЗ или список требований — будет идеально, чтобы всё быстро оценить.",
    "Могу предложить оптимальный вариант, чтобы уложиться в бюджет.",
    "Смотрите, тут есть несколько нюансов — объясню простыми словами.",
    "Да, без проблем. Я сделаю аккуратно и с возможностью расширения в будущем.",
    "Хороший вопрос. Я бы сделал так, чтобы это было надежно и не ломалось при обновлениях.",
    "Всё понял. Я подготовлю план работ и скину вам.",
    "Давайте я сначала посмотрю текущий код/сайт/доступы, и после этого скажу точную оценку.",
    "Да, могу подключиться сегодня. Во сколько вам удобно созвониться/обсудить?",
    "Обычно работаю по этапам: сначала черновой вариант, потом финальная доработка.",
    "Если нужно, могу вести проект и после сдачи (поддержка/правки/доработки).",
    "Хорошо, давайте сделаем так: я начну, а вы параллельно пришлёте материалы.",
    "Я на связи, если будут вопросы — отвечу быстро.",
    "Да, могу сделать. Только уточните, нужно под мобильные тоже адаптировать?",
    "Принял. А какие платформы/браузеры важно поддерживать?",
    "Понял. Тут важный момент — нужно ли учитывать безопасность/авторизацию?",
    "Да, реализуемо. Но важно понять, какая нагрузка ожидается.",
    "Окей. Скажите, вы хотите быстрое решение или максимально качественное и масштабируемое?",
    "Сроки реальные, но лучше заложить небольшой запас на тестирование.",
    "Да, сделаю. Могу отправлять промежуточные результаты, чтобы вы контролировали процесс.",
    "Я могу начать сразу после подтверждения и предоплаты (если договоримся).",
    "Согласен, это хороший подход. Так будет проще поддерживать в будущем.",
    "Я бы предложил сделать это через API — так будет гибче.",
    "Сейчас проверю и скажу, где именно проблема.",
    "Да, это похоже на баг. Я могу быстро диагностировать и исправить.",
    "Спасибо, что уточнили. Тогда сделаем по-другому, чтобы было правильно.",
    "Ок, это не входит в изначальный объём, но я могу добавить за небольшую доплату.",
    "Конечно, правки возможны. Давайте зафиксируем, что именно меняем.",
    "Хорошо, я внесу изменения и отправлю обновлённую версию.",
    "Я бы рекомендовал немного упростить, чтобы сэкономить время и бюджет.",
    "Если честно, так делать не очень правильно — могу объяснить почему и предложить альтернативу.",
    "Всё ок, просто нужно больше информации, чтобы точно оценить.",
    "Я могу сделать оценку по времени и стоимости сегодня.",
    "Да, это можно сделать, но нужно будет доступ к админке/репозиторию/хостингу.",
    "Отлично, спасибо за данные. Сейчас начну разбираться.",
    "Принял. Если что — уточню в процессе, чтобы не сделать лишнего.",
    "Да, понял. Я подготовлю результат и покажу вам до финальной сдачи.",
    "Ок, предлагаю сделать первый этап, а потом уже расширять функционал.",
    "В целом задача ясна. Осталось уточнить пару деталей — и можно стартовать.",
    "Хорошо. Я сделаю максимально аккуратно, чтобы потом было легко поддерживать.",
    "Я могу предложить два варианта: быстро и дешево или чуть дольше, но качественнее.",
    "Да, согласен. Давайте зафиксируем требования, чтобы всё было прозрачно.",
    "Супер. Тогда я начну сегодня и дам промежуточный апдейт завтра.",
    "Привет! Напоминаю по задаче — всё в силе?",
    "Я завершил основную часть. Могу отправить на проверку.",
    "Готово. Посмотрите, пожалуйста, всё ли устраивает.",
    "Если нужно — могу записать короткое видео, как всё работает.",
    "Я всё проверил, багов не вижу. Но если найдете — поправлю.",
    "Сделал. Можете протестировать и дать фидбек.",
    "Если хотите, могу дополнительно оптимизировать скорость загрузки.",
    "Сейчас всё работает, но можно улучшить структуру/производительность — по желанию.",
    "Понял вас. Тогда сделаем так, как вы сказали.",
    "Ок, без проблем. Я внесу это в план.",
    "Да, я свободен и могу взять задачу.",
    "Сейчас занят другим проектом, но могу начать через X дней, если вам подходит.",
    "Я могу взяться, но нужно будет уточнить бюджет — чтобы не получилось недопонимания.",
    "По бюджету можем обсудить и подобрать комфортный вариант.",
    "Если хотите, можем разбить оплату на этапы — так удобнее.",
    "Я стараюсь делать качественно, поэтому лучше заранее согласовать все требования.",
    "Всё ок, давайте продолжим. Я на связи.",
    "Спасибо! Рад помочь 🙂",
];

export const Chat = () => {
    const { userId } = useParams<{ userId: string }>();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { user: ownUser } = useUser();
    const { getMessagesById, saveMessage } = useMessages();
    const [openMore, setOpenMore] = useState(false);
    const moreOptionsRef = useRef<HTMLDivElement>(null);

    const ownUserId = useMemo(() => ownUser?.id ?? 0, [ownUser?.id]);

    const {
        data: currentUser,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ["user", userId],
        queryFn: () => fetchOneUser(Number(userId)),
        staleTime: 5 * 60 * 1000,
        enabled: !!userId,
    });
    const { data: messages } = useQuery({
        queryKey: ["messages", userId],
        queryFn: () => getMessagesById(Number(userId)),
        staleTime: 0,
        enabled: !!userId,
    });
    const { mutate } = useMutation({
        mutationKey: ["sendMessage", userId],
        onMutate: async (messageText: string) => {
            // race conditions
            await queryClient.cancelQueries({ queryKey: ["messages", userId] });

            const previousMessages = queryClient.getQueryData<Message[]>(["messages", userId]);

            const optimisticMessage: Message = {
                id: crypto.randomUUID(),
                text: messageText,
                timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                senderId: ownUserId,
                isRead: false,
            };

            queryClient.setQueriesData(
                { queryKey: ["messages", userId] },
                (prevData: Message[] | undefined) => {
                    if (!prevData) return [optimisticMessage];
                    return [...prevData, optimisticMessage];
                },
            );

            return { previousMessages }; // context -> onError, onSuccess
        },
        mutationFn: async (messageText: string) => {
            const newMessage: Message = {
                id: crypto.randomUUID(),
                text: messageText,
                timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                senderId: ownUserId,
                isRead: false,
            };
            saveMessage(Number(userId), newMessage);

            return newMessage;
        },
        onError: (_err, _value, context) => {
            if (context?.previousMessages) {
                queryClient.setQueryData(["messages", userId], context.previousMessages); // rollback
            }
        },
        onSuccess: () => {
            setTimeout(
                () => {
                    const replyMessage: Message = {
                        id: crypto.randomUUID(),
                        text: freelancerReplies[
                            Math.floor(Math.random() * freelancerReplies.length)
                        ],
                        timestamp: new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        }),
                        senderId: Number(userId),
                        isRead: false,
                    };

                    saveMessage(Number(userId), replyMessage);

                    queryClient.invalidateQueries({ queryKey: ["messages", userId] });
                },
                Math.random() * 2000 + 1000,
            );
        },
    });
    const [messageText, setMessageText] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleClear = () => {
        localStorage.setItem("chat-messages", JSON.stringify({}));
        queryClient.setQueryData(["messages", userId], []);
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
        <div className="bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 py-18">
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
                                {currentUser.status === "online" && (
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
                                    {currentUser.status === "online" ? "В сети" : "Был(а) недавно"}
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
                        <button
                            type="button"
                            className="p-2.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex-shrink-0"
                        >
                            <Paperclip size={22} />
                        </button>

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
