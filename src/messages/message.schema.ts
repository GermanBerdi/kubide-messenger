import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from '../users/user.schema';

@Schema()
export class Message {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: User.name })
  to: User;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: User.name })
  from: User;

  @Prop({ required: true })
  date: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

export type MessageDocument = Message & Document;
