import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/*TODO:
  Hay que modificar el request POST /users/ para que cree un usuario que recibe en body en lugar de uno hardcodeado

  implementar un try ----> catch en los acceso a BBDD

  Si apunto la variable de entorno a mongo atlas se cae, solo funciona en local en la maquina de linux, hay que corregir esto

  Hay que definir que campos tiene un mensaje (messageId, from, to, body, status{delivered, rejeted, ...}) 

  Hay que definir que campos tiene una notificacion (notificationId, to, body)

*/

//importo moongose
const mongoose = require('mongoose');

//chequeo la variable de entorno mongoDbUrl para obtener la url de acceso a mongoDb
//en la consola echo $mongoDbUrl devuelve mongodb+srv://Atlas:M@sterkey1@cluster0.bfq8z.mongodb.net/kubideMessengerDb?retryWrites=true&w=majority
//lo tengo apuntado a mi cluster de mongoDbAtlas

const mongoDbUrl = process.env.mongoDbUrl

//uso mongoose para conectarme a mongoDb 
try 
{
  mongoose.connect(mongoDbUrl,{ useNewUrlParser: true });
} 
catch (e) 
{
  console.error(e);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
