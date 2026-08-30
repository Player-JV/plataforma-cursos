import { Injectable } from '@nestjs/common';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlanosService {
  constructor(private prisma: PrismaService) {}

  create(createPlanoDto: CreatePlanoDto) {
    return this.prisma.plano.create({ data: createPlanoDto });
  }

  findAll() {
    return this.prisma.plano.findMany(); // Sem include solicitado
  }

  findOne(id: number) {
    return this.prisma.plano.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePlanoDto: UpdatePlanoDto) {
    return this.prisma.plano.update({
      where: { id },
      data: updatePlanoDto,
    });
  }

  remove(id: number) {
    return this.prisma.plano.delete({ where: { id } });
  }
}