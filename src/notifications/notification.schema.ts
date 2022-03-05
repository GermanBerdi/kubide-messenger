import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../users/user.schema';
import { Message } from '../messages/message.schema';
import { Schema as MongooseSchema} from 'mongoose';

@Schema()
export class Notification {
  @Prop({ required: true })
  title: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true })
  owner: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Message.name})
  message: Message;

  @Prop({ required: true })
  date: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

export type NotificationDocument = Notification & Document;
