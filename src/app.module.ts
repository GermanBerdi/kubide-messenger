import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthController } from './health.controller';
import { UsersController } from './users.controller';
import { MessageController } from './message.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController,HealthController,UsersController,MessageController],
  providers: [AppService],
})
export class AppModule {}
