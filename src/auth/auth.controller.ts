import { Controller, Post, Body, UnauthorizedException, BadRequestException, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; senha: string }) {
    const user = await this.authService.validateUser(body.email, body.senha);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return this.authService.login(user);
  }


}
