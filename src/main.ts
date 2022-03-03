import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/*TODO:
  He creado health-controller como practica para ver como crear distintos endpoints. Devuelve un string, hay que cambiarlo por un JSON

  Hay que definir que campos tiene un usuario (userId, name, lastName, eMail, password, status{active, inactive, away})

  Hay que definir que campos tiene un mensaje (messageId, from, to, body, status{delivered, rejeted, ...}) 

  Hay que definir que campos tiene una notificacion (notificationId, to, body)

*/
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
