import { Injectable } from '@nestjs/common';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PagamentosService {
  constructor(private prisma: PrismaService) {}

  create(createPagamentoDto: CreatePagamentoDto) {
    return this.prisma.pagamento.create({ data: createPagamentoDto });
  }

  findAll() {
    return this.prisma.pagamento.findMany({
      include: { assinatura: true },
    });
  }

  findOne(id: number) {
    return this.prisma.pagamento.findUnique({
      where: { id },
      include: { assinatura: true },
    });
  }

  update(id: number, updatePagamentoDto: UpdatePagamentoDto) {
    return this.prisma.pagamento.update({
      where: { id },
      data: updatePagamentoDto,
    });
  }

  remove(id: number) {
    return this.prisma.pagamento.delete({ where: { id } });
  }
}