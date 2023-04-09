import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const APP_PORT = process.env.APP_PORT || 3000;
  app.setGlobalPrefix('api');
  await app.listen(APP_PORT);
}
bootstrap();
