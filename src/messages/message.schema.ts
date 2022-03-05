import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../users/user.schema';
import { Schema as MongooseSchema} from 'mongoose';

@Schema()
export class Message {
  @Prop({ required: true })
  content: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true })
  to: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true })
  from: User;

  @Prop({ required: true })
  date: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

export type MessageDocument = Message & Document;
