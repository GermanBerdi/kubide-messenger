import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from '../users/user.schema';
import { Message } from '../messages/message.schema';

@Schema()
export class Notification {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: User.name })
  owner: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Message.name })
  message: Message;

  @Prop({ required: true })
  date: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

export type NotificationDocument = Notification & Document;
