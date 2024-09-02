import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;

  @Prop({ type: String })
  name: string;

  @Prop({ type: Number, default: 0 })
  points: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
