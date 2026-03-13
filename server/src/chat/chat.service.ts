import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ModelClient from '@azure-rest/ai-inference';
import { AzureKeyCredential } from '@azure/core-auth';

@Injectable()
export class ChatService {
  private client: any;
  private modelName: string;

  constructor(private configService: ConfigService) {
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

    try {
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

      return response.body.choices[0].message.content;
    } catch (error) {
      console.error('GitHub Models Error Detail:', error);
      throw new Error(`Failed to generate response from GitHub Models: ${error.message || 'Unknown error'}`);
    }
  }
}
