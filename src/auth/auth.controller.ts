import { Controller, Post, Body, UnauthorizedException, BadRequestException, Get, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express'; // Importando Response do Express
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,

  ) {}

  @Post('login')
  async login(@Body() body: { email: string; senha: string }, @Res() res: Response) {
    const user = await this.authService.validateUser(body.email, body.senha);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    
    const token = await this.authService.login(user);
    console.log('Token gerado:', token);


    res.cookie('user_token', token, {
      httpOnly: true, // Não acessível via JavaScript
      secure: process.env.NODE_ENV === 'production', // Somente HTTPS em produção
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : "none", // Prevenir envio cross-site
    });

    return res.send({ message: 'Login realizado com sucesso' });
  }

}
