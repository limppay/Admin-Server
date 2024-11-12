// auth.service.ts
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, senha: string): Promise<any> {
    const user = await this.userService.findByEmail(email); // Encontrar o usuário pelo e-mail

    if (!user) {
      throw new NotFoundException('Informações incorretas ou usuário não existe :/');
    }


    if (user && bcrypt.compareSync(senha, user.senha)) {
        const { senha, ...result } = user; // Remover a senha da resposta
        return result;
    }

    throw new UnauthorizedException('E-mail ou senha inválidos');
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, type: 'adm' }; // Incluindo 'type' no payload

    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      userId: user.id,
    };
  }

  
}
