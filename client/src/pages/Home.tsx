import React, { useState } from "react";
import { ChatInput } from "@/components/chat/ChatInput";
import { MessageList, Message } from "@/components/chat/MessageList";
import { Sparkles } from "lucide-react";

export const Home: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/chat/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from server");
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.text,
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Извините, произошла ошибка при получении ответа. Пожалуйста, попробуйте позже.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)] relative">
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4 animate-in fade-in duration-700">
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
        <div className="flex-1 overflow-y-auto pt-4 px-4">
          <MessageList messages={messages} />
        </div>
      )}

      {/* Floating Input Area */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-8 bg-linear-to-t from-background via-background/90 to-transparent pointer-events-none">
        <div className="pointer-events-auto w-full">
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={handleSend}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
