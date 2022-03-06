import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    
    async create(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async readAll(): Promise<User[]> {
        return await this.userModel.find().select('-password').lean();
    }

    async readActive(): Promise<User[]> {
        return await this.userModel.find({active: true}).select('-password').lean();
    }
    async isUserActive(id): Promise<Boolean> {
        const count = await this.userModel
            .countDocuments({$and: [{_id:id},{active:true}]});
        return (count > 0);
    }

    async readById(id): Promise<User> {
        return await this.userModel.findById(id).select('-password').lean();
    }

    async readByEmail(email): Promise<User> {
        return await this.userModel.findOne({email}).lean();
    }

    async isDuplicateEmail(email: String): Promise<Boolean> {
        const count = await this.userModel.countDocuments({email});
        return (count > 0);
    }

    async update(id, user: User): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, user, {new: true}).select('-password')
    }

    async updateStatus(id, status: Boolean): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, {active: status}, {new: true}).select('-password')
    }

    async delete(id): Promise<any> {
        return await this.userModel.findByIdAndRemove(id).select('-password');
    }
}
