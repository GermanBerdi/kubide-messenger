import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthController } from './health-controller.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController,HealthController],
  providers: [AppService],
})
export class AppModule {}