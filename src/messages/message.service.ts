import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Message, MessageDocument } from "./message.schema";

const populateUsers = [{
    path: "to",
    select: "-password -__v",
},{
    path: "from",
    select:  "-password -__v",
}];

@Injectable()
export class MessageService {

    constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}
    
    async create(message: Message): Promise<Message> {
        const newMessage = new this.messageModel(message);
        return newMessage.save();
    }
   
    // The .sort({date: -1}) is for ordering the messages from 
    // newer to older
    async readAll(userId): Promise<Message[]> {
        return await this.messageModel
            .find({ $or: [{from: userId}, {to: userId}] })
            .populate(populateUsers)
            .sort({date: -1})
            .lean();
    }

    async readById(id, userId): Promise<Message> {
        return await this.messageModel
            .find({
                $and: [
                    {_id: id}, 
                    {$or: [{from: userId}, {to: userId}]}
                ]
            })
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
