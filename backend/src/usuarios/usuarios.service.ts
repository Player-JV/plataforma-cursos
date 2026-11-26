import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { NotificacoesService } from '../notificacoes/notificacoes.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    private prisma: PrismaService,
    private notificacoesService: NotificacoesService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUsuarioDto.senha, salt);

    const usuario = await this.prisma.usuario.create({
      data: {
        nomeCompleto: createUsuarioDto.nome,
        email: createUsuarioDto.email,
        senhaHash: hash,
      },
    });

    // Publica o evento no Kafka para gerar a notificação de boas-vindas
    await this.notificacoesService.emitirEvento('usuario-cadastrado', {
      idUsuario: usuario.id,
      nome: usuario.nomeCompleto,
      email: usuario.email,
    });

    return usuario;
  }

  async findByEmail(email: string) {
    return this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  findAll() {
    return this.prisma.usuario.findMany();
  }

  findOne(id: number) {
    return this.prisma.usuario.findUnique({ where: { id } });
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.prisma.usuario.update({
      where: { id },
      data: updateUsuarioDto,
    });
  }

  remove(id: number) {
    return this.prisma.usuario.delete({ where: { id } });
  }
}