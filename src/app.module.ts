import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthController } from './health/health.controller';
import { UserModule } from './users/user.module';
import { MessageModule } from './messages/message.module';
import { NotificationModule } from './notifications/notification.module';
import { AuthModule } from './auth/auth.module';

const mongoDbUrl = process.env.mongoDbUrl || "mongodb://localhost:27017/kubideMessengerDb";

@Module({
  imports:     [MongooseModule.forRoot(mongoDbUrl),
                UserModule,
                MessageModule,
                NotificationModule,
                AuthModule,
               ],
  controllers: [AppController,HealthController],
  providers:   [AppService],
})
export class AppModule {}
