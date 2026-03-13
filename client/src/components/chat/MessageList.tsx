import React from "react";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  if (messages.length === 0) return null;

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto pb-32">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
            message.role === "user" ? "flex-row-reverse" : "flex-row"
          )}
        >
          <div className={cn(
            "size-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold",
            message.role === "user" ? "bg-accent text-white" : "bg-primary text-white"
          )}>
            {message.role === "user" ? "U" : "AI"}
          </div>
          <div
            className={cn(
              "max-w-[85%] rounded-2xl px-4 py-2.5 text-[0.95rem] leading-relaxed shadow-sm",
              message.role === "user" 
                ? "bg-secondary text-white rounded-tr-none" 
                : "bg-white/5 text-white/90 border border-white/5 rounded-tl-none"
            )}
          >
            <div className="whitespace-pre-wrap">{message.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
