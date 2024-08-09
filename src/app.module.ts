import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { NoteController } from './note/note.controller';
import { NoteService } from './note/note.service';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, ConfigModule.forRoot({isGlobal:true})],
  controllers: [NoteController],
  providers: [NoteService],
})
export class AppModule {}
