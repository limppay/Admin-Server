import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from 'src/jwt-strategy/jwt-strategy';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m', algorithm: "HS256" }, // Token expira em 60 minutos
    }),
  ],
  providers: [AuthService, JwtStrategy, UserService, ConfigService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
