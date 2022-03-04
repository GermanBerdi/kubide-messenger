import { Controller, Get, Post} from '@nestjs/common';

@Controller('messages')
export class MessageController {
    @Get()
    listMessage(): string {
        return 'Esto devuelve los mensajes';
    }

    @Post()
    createMessage(): string {
        return 'Si el destinatario esta activo crea un mensaje y envia una notificacion al usuario que lo recibe. Caso contrario rechaza el mensaje';
    }

    @Get('notifications')
    listNotifications() : string {
        return 'Esto devuelve las notificaciones';
    }
}