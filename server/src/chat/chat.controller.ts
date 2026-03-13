import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send')
  async sendMessage(@Body('message') message: string) {
    const response = await this.chatService.generateResponse(message);
    return { text: response };
  }

  @Get('history')
  async getHistory() {
    return this.chatService.getHistory();
  }

  @Delete('history')
  async clearHistory() {
    await this.chatService.clearHistory();
    return { success: true };
  }
}
