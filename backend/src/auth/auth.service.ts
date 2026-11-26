import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

export interface JwtPayload { sub: number; email: string; }

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usuariosService.findByEmail(loginDto.email);

    if (!user || !(await bcrypt.compare(loginDto.password, user.senhaHash))) {
      throw new UnauthorizedException('E-mail ou senha incorretos');
    }

    const payload: JwtPayload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: user.id,
        nomeCompleto: user.nomeCompleto,
        email: user.email,
      },
    };
  }
}