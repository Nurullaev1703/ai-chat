import { apiService } from "./apiService";
import { Message } from "@/contexts/ChatContext";

export class ChatApiService {
  static async getHistory() {
    const response = await apiService.get<Message[]>({ 
      url: "/chat/history" 
    });
    return response.data;
  }

  static async sendMessage(content: string) {
    const response = await apiService.post<{ text: string }>({
      url: "/chat/send",
      dto: { message: content },
    });
    return response.data;
  }

  static async clearHistory() {
    const response = await apiService.delete<{ success: boolean }>({ 
      url: "/chat/history" 
    });
    return response.data;
  }
}
