import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/auth/user.entity';
import { ChatGateway } from 'src/chat.gateway';
import { Message } from './entities/message.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Message, User])],
  providers: [ChatGateway],
})
export class MessageModule {}