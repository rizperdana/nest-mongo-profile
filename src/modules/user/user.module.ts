import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/modules/user/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'super-secret-key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export default class UserModule {}
