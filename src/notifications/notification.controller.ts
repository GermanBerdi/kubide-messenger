import { Controller, UseGuards, HttpStatus, Res, Req } from "@nestjs/common";
import { Get } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller('notifications')   
export class NotificationController {

    constructor(private readonly notificationService: NotificationService) {}

    //TODO: This should only retrieve the current user's notifications
    @Get()
    async fetchAll(@Res() response, @Req() req) {
        const notifications = await this.notificationService.readAll(req.user.id);
        return response.status(HttpStatus.OK).json(notifications)
    }
}
