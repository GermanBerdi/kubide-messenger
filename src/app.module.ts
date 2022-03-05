import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthController } from './health/health.controller';
import { UserController } from './users/user.controller';
import { User, UserSchema } from './users/user.schema';
import { UserService } from './users/user.service';
import { MessageController } from './messages/message.controller';
import { Message, MessageSchema } from './messages/message.schema';
import { MessageService } from './messages/message.service';
import { NotificationController } from './notifications/notification.controller';
import { Notification, NotificationSchema } from './notifications/notification.schema';
import { NotificationService } from './notifications/notification.service';


const mongoDbUrl = process.env.mongoDbUrl || "mongodb://localhost:27017/kubideMessengerDb";

@Module({
  imports:     [MongooseModule.forRoot(mongoDbUrl),
                MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
                MongooseModule.forFeature([{name: Message.name, schema: MessageSchema}]),
                MongooseModule.forFeature([{name: Notification.name, schema: NotificationSchema}]),
               ],
  controllers: [AppController,HealthController,UserController,MessageController,NotificationController],
  providers:   [AppService,UserService,MessageService,NotificationService],
})
export class AppModule {}
