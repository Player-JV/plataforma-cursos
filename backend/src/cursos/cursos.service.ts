import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificacoesService } from '../notificacoes/notificacoes.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursosService {
  constructor(
    private prisma: PrismaService,
    private notificacoesService: NotificacoesService,
  ) {}

  async create(createCursoDto: CreateCursoDto) {
    const curso = await this.prisma.curso.create({ data: createCursoDto });

    // Publica no Kafka para avisar o celular que saiu curso novo
    await this.notificacoesService.emitirEvento('curso-criado', {
      idCurso: curso.id,
      titulo: curso.titulo,
    });

    return curso;
  }

  findAll() {
    return this.prisma.curso.findMany({
      include: { categoria: true, instrutor: true },
    });
  }

  findOne(id: number) {
    return this.prisma.curso.findUnique({
      where: { id },
      include: {
        categoria: true,
        instrutor: true,
        modulos: {
          orderBy: { ordem: 'asc' },
          include: {
            aulas: { orderBy: { ordem: 'asc' } },
          },
        },
      },
    });
  }

  update(id: number, updateCursoDto: UpdateCursoDto) {
    return this.prisma.curso.update({
      where: { id },
      data: updateCursoDto,
    });
  }

  remove(id: number) {
    return this.prisma.curso.delete({ where: { id } });
  }
}