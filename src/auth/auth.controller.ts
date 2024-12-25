import { Controller, Post, Body, UnauthorizedException, BadRequestException, Get, Query, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express'; // Importando Response do Express
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,

  ) {}

  @Post('login')
  async login(@Body() body: { email: string; senha: string }, @Res() res: Response, @Req() req: Request) {
    const user = await this.authService.validateUser(body.email, body.senha);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    
    const token = await this.authService.login(user);
    console.log('Token gerado:', token);

    // Verifica se já existe um token de user
    // Verifica se já existe um token de user
    if (req.cookies['user_token']) {
      res.clearCookie('user_token');
    }

    if (req.cookies['cliente_token']) {
      res.clearCookie('cliente_token');
    }
    
    if (req.cookies['admin_token']) {
      res.clearCookie('admin_token');
    }

    res.cookie('admin_token', token, {
      httpOnly: true, // Não acessível via JavaScript
      secure: process.env.NODE_ENV === 'production', // Somente HTTPS em produção
      sameSite: 'none', // Permite envio entre domínios diferentes
      domain: 'up.railway.app', // Configurar domínio compartilhado
    
    });

    return res.send({ message: 'Login realizado com sucesso' });
  }

}
