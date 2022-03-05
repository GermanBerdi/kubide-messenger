import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { Message } from "./message.schema";
import { MessageService } from "./message.service";
import { NotificationService } from "src/notifications/notification.service";

//TODO check that the user has permissions to access the message

@Controller('messages')   
export class MessageController {

    constructor(
        private readonly messageService: MessageService,
        private readonly notificationService: NotificationService,
    ) {}

    //When create a message also create the proper notification
    //TODO check the user exist and he is active before sent
    @Post()
    async createMessage(@Res() response, @Body() message: Message) {
        message.date = new Date();
        const newMessage = await this.messageService.create(message);
        const notification = {
            title: "You have a new messsage",
            owner: newMessage.to,
            date: new Date(),
            message: newMessage,
        }
        const newNotification = await this.notificationService.create(notification);
        return response.status(HttpStatus.CREATED).json(newMessage)
    }

    //TODO: This should only retireve the current user's messages
    //TODO: my messages....sent or received or both?
    @Get()
    async fetchAll(@Res() response) {
        const messages = await this.messageService.readAll();
        return response.status(HttpStatus.OK).json(messages)
    }

    @Get(':id')
    async findById(@Res() response, @Param('id') id) {
        const message = await this.messageService.readById(id);
        if (message === null) {
            return response.status(HttpStatus.NOT_FOUND).send()
        }
        return response.status(HttpStatus.OK).json(message)
    }
}
