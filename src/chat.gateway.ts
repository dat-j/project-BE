import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message/entities/message.entity';
import { User } from './auth/user.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: { userId: number; content: string }): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: payload.userId } });
    if (!user) {
      return;
    }

    const message = this.messageRepository.create({
      content: payload.content,
      user: user,
    });

    await this.messageRepository.save(message);

    this.server.emit('newMessage', {
      id: message.id,
      content: message.content,
      createdAt: message.createdAt,
      username: user.username,
      avatarUrl: user.avatarUrl
    });
  }
}