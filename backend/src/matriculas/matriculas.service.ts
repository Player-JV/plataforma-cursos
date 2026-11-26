import { Injectable } from '@nestjs/common';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { PrismaService } from '../prisma/prisma.service';
import { NotificacoesService } from '../notificacoes/notificacoes.service';

@Injectable()
export class MatriculasService {
  constructor(
    private prisma: PrismaService,
    private notificacoesService: NotificacoesService,
  ) {}

  async create(createMatriculaDto: CreateMatriculaDto) {
    const matricula = await this.prisma.matricula.create({
      data: createMatriculaDto,
      include: { curso: true },
    });

    // Publica no Kafka para notificar o aluno no celular
    await this.notificacoesService.emitirEvento('matricula-criada', {
      idUsuario: matricula.idUsuario,
      idCurso: matricula.idCurso,
      tituloCurso: matricula.curso.titulo,
    });

    return matricula;
  }

  findAll() {
    return this.prisma.matricula.findMany({
      include: {
        usuario: true,
        curso: { include: { categoria: true } },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.matricula.findUnique({
      where: { id },
      include: { usuario: true, curso: true },
    });
  }

  update(id: number, updateMatriculaDto: UpdateMatriculaDto) {
    return this.prisma.matricula.update({
      where: { id },
      data: updateMatriculaDto,
    });
  }

  remove(id: number) {
    return this.prisma.matricula.delete({ where: { id } });
  }
}