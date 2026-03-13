import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ModelClient from '@azure-rest/ai-inference';
import { AzureKeyCredential } from '@azure/core-auth';
import { Message as MessageEntity } from './entities/message.entity';

@Injectable()
export class ChatService {
  private client: any;
  private modelName: string;

  constructor(
    private configService: ConfigService,
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {
    const token = this.configService.get<string>('GITHUB_TOKEN');
    this.modelName = this.configService.get<string>('GITHUB_MODEL') || 'gpt-4o';
    
    this.client = ModelClient(
      'https://models.inference.ai.azure.com',
      new AzureKeyCredential(token || '')
    );
  }

  async generateResponse(prompt: string) {
    if (!prompt || prompt.trim() === '') {
      throw new Error('Message cannot be empty');
    }

    // 1. Save user message
    const userMsg = this.messageRepository.create({
      role: 'user',
      content: prompt,
    });
    await this.messageRepository.save(userMsg);

    try {
      // 2. Get history for context (optional, but good for UX)
      // For now we just send the current message as per user request to keep it simple, 
      // but we could send recent history here too.
      
      const response = await this.client.path('/chat/completions').post({
        body: {
          messages: [
            { role: 'user', content: prompt }
          ],
          model: this.modelName,
          temperature: 0.8,
          max_tokens: 2048,
          top_p: 1
        }
      });

      if (response.status !== '200') {
        throw response.body.error;
      }

      const assistantContent = response.body.choices[0].message.content;

      // 3. Save assistant message
      const assistantMsg = this.messageRepository.create({
        role: 'assistant',
        content: assistantContent,
      });
      await this.messageRepository.save(assistantMsg);

      return assistantContent;
    } catch (error) {
      console.error('GitHub Models Error Detail:', error);
      throw new Error(`Failed to generate response: ${error.message || 'Unknown error'}`);
    }
  }

  async getHistory() {
    return this.messageRepository.find({
      order: { createdAt: 'ASC' },
    });
  }

  async clearHistory() {
    await this.messageRepository.clear();
  }
}
