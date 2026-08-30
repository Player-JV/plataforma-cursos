import { Injectable } from '@nestjs/common';
import { CreateTrilhaDto } from './dto/create-trilha.dto';
import { UpdateTrilhaDto } from './dto/update-trilha.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrilhasService {
  constructor(private prisma: PrismaService) {}

  create(createTrilhaDto: CreateTrilhaDto) {
    return this.prisma.trilha.create({ data: createTrilhaDto });
  }

  findAll() {
    return this.prisma.trilha.findMany({
      include: { categoria: true },
    });
  }

  findOne(id: number) {
    return this.prisma.trilha.findUnique({
      where: { id },
      include: { categoria: true },
    });
  }

  update(id: number, updateTrilhaDto: UpdateTrilhaDto) {
    return this.prisma.trilha.update({
      where: { id },
      data: updateTrilhaDto,
    });
  }

  remove(id: number) {
    return this.prisma.trilha.delete({ where: { id } });
  }
}