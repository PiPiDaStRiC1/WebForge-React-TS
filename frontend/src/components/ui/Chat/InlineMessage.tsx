import type {Message, UserData} from "@/types";
import {Link} from "react-router-dom";

interface InlineMessageProps {
    message: Message;
    currentUser: Pick<UserData, "id" | "name" | "picture">;
    ownUserId: number;
}

export const InlineMessage = ({message, currentUser, ownUserId}: InlineMessageProps) => {
    const isOwn = message.senderId === ownUserId;

    return (
        <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-2 max-w-[75%] ${isOwn ? "flex-row-reverse" : "flex-row"}`}>
                {!isOwn && (
                    <>
                        {currentUser.picture ? (
                            <Link to={`/profile/${currentUser.id}`}>
                                <img
                                    src={currentUser.picture.medium}
                                    alt={currentUser.name}
                                    className="w-8 h-8 rounded-full flex-shrink-0 mt-1"
                                />
                            </Link>
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                                {currentUser.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                        )}
                    </>
                )}
                <div>
                    <div
                        className={`px-4 py-2.5 rounded-2xl ${
                            isOwn
                                ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-br-sm shadow-md"
                                : "bg-white border border-gray-200 text-gray-900 rounded-bl-sm shadow-sm"
                        }`}
                    >
                        <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
                            {message.text}
                        </p>
                    </div>
                    <p
                        className={`text-xs mt-1 px-1 ${isOwn ? "text-right text-gray-500" : "text-left text-gray-500"}`}
                    >
                        {message.timestamp}
                    </p>
                </div>
            </div>
        </div>
    );
};
