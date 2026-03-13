import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastContext } from "./ToastContext";
import { ChatApiService } from "@/services/chatService";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
}

interface ChatContextType {
  messages: Message[];
  isHistoryLoading: boolean;
  clearHistory: () => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  isSending: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { addToast } = useToastContext();
  const queryClient = useQueryClient();

  // Fetch history using React Query
  const { data: history, isLoading: isHistoryLoading } = useQuery({
    queryKey: ["chat-history"],
    queryFn: () => ChatApiService.getHistory(),
  });

  // Sync messages state with history data
  useEffect(() => {
    if (history) {
      setMessages(history);
    }
  }, [history]);

  // Mutation for clearing history
  const clearMutation = useMutation({
    mutationFn: () => ChatApiService.clearHistory(),
    onSuccess: () => {
      setMessages([]);
      queryClient.setQueryData(["chat-history"], []);
      addToast("История чата успешно очищена", "success");
    },
    onError: (error: any) => {
      console.error("Failed to clear history:", error);
      addToast("Не удалось очистить историю", "error");
    },
  });

  // Mutation for sending messages
  const sendMutation = useMutation({
    mutationFn: (content: string) => ChatApiService.sendMessage(content),
    onSuccess: (data) => {
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.text,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    },
    onError: (error: any) => {
      console.error("Chat Error:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "Извините, произошла ошибка. Пожалуйста, попробуйте позже.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      addToast("Ошибка при отправке сообщения", "error");
    },
  });

  const clearHistory = useCallback(async () => {
    await clearMutation.mutateAsync();
  }, [clearMutation]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || sendMutation.isPending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    sendMutation.mutate(content);
  }, [sendMutation]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        isHistoryLoading,
        clearHistory,
        sendMessage,
        isSending: sendMutation.isPending,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
