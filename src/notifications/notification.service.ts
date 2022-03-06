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
   
    async readAll(userId): Promise<Notification[]> {
        return await this.notificationModel.find({owner: userId})
            .select ("-owner")
            .populate("message")
            .lean();
    }

    //TODO: This was not required, Delete?
    async readById(id): Promise<Notification> {
        return await this.notificationModel.findById(id)
            .populate("message")
            .lean();
    }
    //TODO: This was not required, Delete?
    async update(id, notification: Notification): Promise<Notification> {
        return await this.notificationModel.findByIdAndUpdate(id, notification, {new: true})
    }
    
    //TODO: This was not required, Delete?
    async delete(id): Promise<any> {
        return await this.notificationModel.findByIdAndRemove(id);
    }
}
