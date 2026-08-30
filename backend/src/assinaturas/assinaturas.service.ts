import { Injectable } from '@nestjs/common';
import { CreateAssinaturaDto } from './dto/create-assinatura.dto';
import { UpdateAssinaturaDto } from './dto/update-assinatura.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AssinaturasService {
  constructor(private prisma: PrismaService) {}

  create(createAssinaturaDto: CreateAssinaturaDto) {
    return this.prisma.assinatura.create({ data: createAssinaturaDto });
  }

  findAll() {
    return this.prisma.assinatura.findMany({
      include: { usuario: true, plano: true },
    });
  }

  findOne(id: number) {
    return this.prisma.assinatura.findUnique({
      where: { id },
      include: { usuario: true, plano: true },
    });
  }

  update(id: number, updateAssinaturaDto: UpdateAssinaturaDto) {
    return this.prisma.assinatura.update({
      where: { id },
      data: updateAssinaturaDto,
    });
  }

  remove(id: number) {
    return this.prisma.assinatura.delete({ where: { id } });
  }
}