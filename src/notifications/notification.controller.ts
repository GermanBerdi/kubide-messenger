import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { NotificationService } from "./notification.service";

@Controller('notifications')   
export class NotificationController {

    constructor(private readonly notificationService: NotificationService) {}

    //TODO: This should only retireve the current user's notifications
    @Get()
    async fetchAll(@Res() response) {
        const notifications = await this.notificationService.readAll();
        return response.status(HttpStatus.OK).json(notifications)
    }
}
