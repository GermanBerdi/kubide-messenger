import { Controller, UseGuards, HttpStatus, Param, Req, Res } from "@nestjs/common";
import { Get, Post } from "@nestjs/common";
import { Message } from "./message.schema";
import { MessageService } from "./message.service";
import { NotificationService } from "../notifications/notification.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserService } from "../users/user.service";

@UseGuards(JwtAuthGuard)
@Controller('messages')   
export class MessageController {

    constructor(
        private readonly messageService: MessageService,
        private readonly notificationService: NotificationService,
        private readonly userService: UserService,
    ) {}

    // When create a message also create the proper notification
    @Post()
    async createMessage(@Res() response, @Req() req) {
        const message = req.body;

        // Check if the receiver is active
        if (!(await this.userService.isUserActive(message.to)))
            return response.status(HttpStatus.NOT_ACCEPTABLE).send();

        message.from = req.user.id;
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

    // This only retireve the current user's messages
    // Sent and received
    @Get()
    async fetchAll(@Res() response, @Req() req) {
        const messages = await this.messageService.readAll(req.user.id);
        return response.status(HttpStatus.OK).json(messages)
    }

    @Get(':id')
    async findById(@Res() response, @Param('id') id, @Req() req) {
        const message = await this.messageService.readById(id, req.user.id);
        if (message === null) {
            return response.status(HttpStatus.NOT_FOUND).send()
        }
        return response.status(HttpStatus.OK).json(message)
    }
}
