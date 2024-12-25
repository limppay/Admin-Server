import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173', 'http://192.168.105.29:5173', 'https://limppay-frontend-production.up.railway.app', 'https://admin-app-production-076f.up.railway.app', "https://limppay-api-production.up.railway.app", "https://admin-app-production-076f.up.railway.app"],
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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
