import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Notification, NotificationDocument } from "./notification.schema";

@Injectable()
export class NotificationService {

    constructor(@InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>) {}
    
    async create(notification: Notification): Promise<Notification> {
        const newNotification = new this.notificationModel(notification);
        return newNotification.save();
    }
   
    async readAll(): Promise<Notification[]> {
        return await this.notificationModel.find()
            .populate("owner")
            .populate("message")
            .lean();
    }

    async readById(id): Promise<Notification> {
        return await this.notificationModel.findById(id)
            .populate("owner")
            .populate("message")
            .lean();
    }

    async update(id, notification: Notification): Promise<Notification> {
        return await this.notificationModel.findByIdAndUpdate(id, notification, {new: true})
    }

    async delete(id): Promise<any> {
        return await this.notificationModel.findByIdAndRemove(id);
    }
}
