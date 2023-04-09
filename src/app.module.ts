import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import UserModule from './modules/user/user.module';

const defaultDb = 'mongodb://admin:admin@localhost:27017';
const MONGO_URL = process.env.MONGODB_URL || defaultDb;

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(MONGO_URL, {
      dbName: 'nest_profile',
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
