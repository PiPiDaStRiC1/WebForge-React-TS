import { prisma } from "@/helpers";
import { BOTS_IDS } from "@shared/constants";
import type { Request, Response } from "express";
import type { ApiResponse, MessagesData, Message } from "@shared/types";

const commonReplies: string[] = [
    "Привет! Спасибо за сообщение 🙂",
    "Спасибо за обращение! Сейчас уточню детали и вернусь с ответом.",
    "Задача понятна. Нужно уточнить пару моментов, чтобы всё сделать правильно.",
    "Да, это реализуемо. Всё зависит от деталей и сроков.",
    "Отлично, звучит понятно. Давайте уточним требования и ожидаемый результат.",
    "Подскажите, есть ли примеры/референсы того, как должно выглядеть?",
    "Если есть ТЗ или список требований — будет идеально для быстрой оценки.",
    "Сначала стоит посмотреть текущий код/сайт/макеты, чтобы дать точную оценку.",
    "Обычно работа идёт по этапам: черновой вариант → проверка → финальная версия.",
    "Если нужно — возможна поддержка и доработки после сдачи проекта.",
    "Если появятся вопросы — можно писать, отвечу максимально быстро.",
    "Важно уточнить, какие платформы/браузеры нужно поддерживать.",
    "Нужно уточнить, требуется ли авторизация/безопасность/роли пользователей.",
    "Решение возможно, но важно понять ожидаемую нагрузку.",
    "Уточните, нужен быстрый вариант или более масштабируемое решение.",
    "По срокам всё реально, но лучше заложить время на тестирование.",
    "Можно отправлять промежуточные результаты, чтобы всё было прозрачно.",
    "Сейчас уточню и скажу, где именно проблема.",
    "Похоже на баг — можно быстро диагностировать и исправить.",
    "Спасибо за уточнение. Тогда лучше сделать немного по-другому.",
    "Правки возможны. Лучше заранее зафиксировать, что именно меняем.",
    "Ок, изменения внесу и отправлю обновлённую версию.",
    "Есть вариант сделать проще и быстрее, чтобы сэкономить бюджет.",
    "Есть нюанс: так делать не очень правильно. Могу объяснить и предложить альтернативу.",
    "Нужно чуть больше информации, чтобы точно оценить объём.",
    "Оценку по времени и стоимости можно подготовить сегодня.",
    "Для реализации потребуется доступ к репозиторию/админке/хостингу.",
    "Спасибо за данные! Сейчас начну разбираться.",
    "Если потребуется — уточню в процессе, чтобы не сделать лишнего.",
    "Можно начать с первого этапа, а потом расширять функционал.",
    "В целом всё ясно. Осталось уточнить детали — и можно стартовать.",
    "Чтобы всё было прозрачно, лучше зафиксировать требования заранее.",
    "Напоминаю по задаче — всё актуально?",
    "Если нужно — можно записать короткое видео с демонстрацией результата.",
    "Можно протестировать и дать фидбек — всё поправлю при необходимости.",
    "Если хотите, можно дополнительно оптимизировать скорость загрузки.",
    "Текущий вариант рабочий, но есть идеи, как улучшить структуру и производительность.",
    "Ок, сделаем именно так, как вы описали.",
    "Хорошо, добавлю это в план работ.",
    "По бюджету можно обсудить и подобрать комфортный вариант.",
    "При желании можно разбить оплату на этапы.",
    "Чтобы всё прошло гладко, лучше заранее согласовать требования.",
    "Продолжаем, я на связи 🙂",
    "Спасибо! Было приятно помочь 🙌",
];

export const getAllMessages = async (req: Request, res: Response<ApiResponse<MessagesData>>) => {
    try {
        const { userId } = req.user!;

        const chats = (await prisma.chat.findMany({
            where: { userId },
            select: { collId: true, messages: true },
        })) as { collId: number; messages: Message[] }[];

        const data = Object.fromEntries(chats.map((chat) => [chat.collId, chat.messages]));

        res.status(200).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, data: "Internal server error" });
    }
};

export const getMessagesByCollId = async (
    req: Request<{ collId: string }, {}, {}, {}>,
    res: Response<ApiResponse<Message[]>>,
) => {
    try {
        const { userId } = req.user!;
        const collId = Number(req.params["collId"]);

        const chat = (await prisma.chat.findFirst({
            where: { collId, userId },
            select: { messages: true },
        })) as { messages: Message[] };

        if (!chat) {
            return res.status(200).json({ success: true, data: [] });
        }

        return res.status(200).json({ success: true, data: chat.messages });
    } catch (error) {
        return res.status(500).json({ success: false, data: "Internal server error" });
    }
};

export const postMessageByCollId = async (
    req: Request<{ collId: string }, {}, Message>,
    res: Response<ApiResponse<string>>,
) => {
    try {
        const { userId } = req.user!;
        const collId = Number(req.params.collId);
        const { text } = req.body;

        const isBot = BOTS_IDS.includes(collId);

        const chat = await prisma.chat.upsert({
            where: { userId_collId: { collId, userId } },
            update: {},
            create: { userId, collId },
            select: { id: true },
        });

        await prisma.message.create({
            data: { senderId: userId, text, chatId: chat.id, senderType: "user" },
        });

        if (isBot) {
            setTimeout(
                async () => {
                    const replyMessage = {
                        text: commonReplies[Math.floor(Math.random() * commonReplies.length)]!,
                        timestamp: new Date(),
                        senderId: collId,
                    };

                    await prisma.message.create({
                        data: { ...replyMessage, chatId: chat.id, senderType: "bot" },
                    });
                },
                Math.floor(Math.random() * 10000),
            );
        }

        return res.status(200).json({ success: true, data: "Post message" });
    } catch (error) {
        return res.status(500).json({ success: false, data: "Internal server error" });
    }
};

export const deleteMessagesByCollId = async (
    req: Request<{ collId: string }, {}, Message>,
    res: Response<ApiResponse<string>>,
) => {
    try {
        const { userId } = req.user!;
        const collId = Number(req.params["collId"]);

        await prisma.message.deleteMany({ where: { chat: { collId, userId } } });
        return res.status(200).json({ success: true, data: "Message deleted" });
    } catch (error) {
        return res.status(500).json({ success: false, data: "Internal server error" });
    }
};