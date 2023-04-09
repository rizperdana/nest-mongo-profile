import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  displayName: string;

  @Prop()
  image: string;

  @Prop()
  gender: string;

  @Prop()
  birthday: Date;

  @Prop()
  horoscope: string;

  @Prop()
  zodiac: string;

  @Prop()
  height: number;

  @Prop()
  weight: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (this: UserDocument, next: any) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;

    return next();
  } catch (err) {
    return next(err);
  }
});
