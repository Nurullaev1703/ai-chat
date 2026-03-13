import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal:true}), DatabaseModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
