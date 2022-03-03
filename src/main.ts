import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/*TODO:
  Hay que modificar la funcion list users.controller.ts @Controller('users')@get()listusers para que LEA los datos de los usuarios de la BBDD

  Hay que definir que campos tiene un mensaje (messageId, from, to, body, status{delivered, rejeted, ...}) 

  Hay que definir que campos tiene una notificacion (notificationId, to, body)

*/
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
