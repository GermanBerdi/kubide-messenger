import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Message, MessageSchema } from './message.schema';
import { NotificationModule } from '../notifications/notification.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Message.name, schema: MessageSchema}]),
    NotificationModule,
    UserModule,
  ],
  controllers: [
    MessageController
  ],
  providers: [
    MessageService
  ],
  exports: [
    MessageService
  ],
})
export class MessageModule {}