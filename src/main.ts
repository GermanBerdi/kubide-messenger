import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/*TODO:
  He creado health-controller como practica para ver como crear distintos endpoints. Devuelve un string, hay que cambiarlo por un JSON


*/
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
