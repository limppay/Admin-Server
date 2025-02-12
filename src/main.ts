import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:4000', 'http://localhost:3000', process.env.URL_APP, process.env.URL_APP_ADMIN, process.env.ADMIN_API_URL],
    methods: [
      'GET',
      'POST',
      'PUT',
      'DELETE',
      'PATCH',
      'OPTIONS',
      'HEAD',
      'CONNECT',
      'TRACE'
    ]
    ,
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  });
  
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
