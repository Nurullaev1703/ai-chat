import React, { useState } from "react";
import { ChatInput } from "@/components/chat/ChatInput";
import { MessageList } from "@/components/chat/MessageList";
import { Sparkles, Loader2 } from "lucide-react";
import { useChat } from "@/contexts/ChatContext";

export const Home: React.FC = () => {
  const { messages, isHistoryLoading, sendMessage, isSending } = useChat();
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim() || isSending) return;
    const currentInput = input;
    setInput(""); // Clear input immediately for better UX
    await sendMessage(currentInput);
  };

  if (isHistoryLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-[calc(100vh-8rem)]">
        <Loader2 className="size-8 text-primary animate-spin mb-4" />
        <p className="text-white/40 text-sm animate-pulse">Загрузка истории...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)] relative">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4 animate-in fade-in zoom-in duration-700">
          <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20 shadow-lg">
            <Sparkles className="text-primary size-8" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3 text-center">
            Чем я могу помочь?
          </h2>
          <p className="text-white/40 text-center max-w-sm mb-12">
            Спрашивайте о чем угодно — от написания кода до планирования
            путешествия. Я поддержу разговор на любую тему.
          </p>

          <div className="grid gap-3 w-full max-w-md">
            {[
              "Напиши стихотворение о космосе",
              "Как приготовить идеальный стейк?",
              "Объясни квантовую физику ребенку",
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setInput(suggestion)}
                className="text-left p-3.5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-all text-sm text-white/70"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pt-4 px-4 pb-32">
          <MessageList messages={messages} />
        </div>
      )}

      {/* Floating Input Area */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none">
        <div className="pointer-events-auto w-full">
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={handleSend}
            isLoading={isSending}
          />
        </div>
      </div>
    </div>
  );
};
