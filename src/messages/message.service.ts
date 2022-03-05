import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message, MessageDocument } from "./message.schema";

const populateUsers = [{
    path: "to",
    select: "-__v",
},{
    path: "from",
    select:  "-__v",
}];

@Injectable()
export class MessageService {

    constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}
    
    async create(message: Message): Promise<Message> {
        const newMessage = new this.messageModel(message);
        return newMessage.save();
    }

    //Populate from and to user
    
    async readAll(): Promise<Message[]> {
        return await this.messageModel.find()
            .populate(populateUsers)
            .lean();
    }

    async readById(id): Promise<Message> {
        return await this.messageModel.findById(id)
            .populate(populateUsers)
            .lean();
    }

    async update(id, message: Message): Promise<Message> {
        return await this.messageModel.findByIdAndUpdate(id, message, {new: true})
    }

    async delete(id): Promise<any> {
        return await this.messageModel.findByIdAndRemove(id);
    }
}
