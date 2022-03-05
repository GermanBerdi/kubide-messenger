import { Controller, Get, HttpStatus, Res, UseGuards } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
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
