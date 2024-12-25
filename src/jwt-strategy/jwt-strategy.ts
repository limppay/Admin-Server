import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        const adminToken = req.cookies['admin_token'];

        console.log('Tokens encontrados nos cookies:', { adminToken });

        if (!adminToken) {
          throw new UnauthorizedException('Token não encontrado');
        }

        return adminToken;
      },
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any, @Req() req: Request) {
    console.log('Payload recebido: ', payload);

    const user = await this.userService.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return user;
  }
}



