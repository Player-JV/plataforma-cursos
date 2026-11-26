import { Injectable } from '@nestjs/common';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
import { PrismaService } from '../prisma/prisma.service';
import { NotificacoesService } from '../notificacoes/notificacoes.service';

@Injectable()
export class PagamentosService {
  constructor(
    private prisma: PrismaService,
    private notificacoesService: NotificacoesService,
  ) {}

  async create(createPagamentoDto: CreatePagamentoDto) {
    const pagamento = await this.prisma.pagamento.create({
      data: createPagamentoDto,
      include: { assinatura: true },
    });

    // Publica no Kafka para confirmar o pagamento no celular
    await this.notificacoesService.emitirEvento('pagamento-aprovado', {
      idUsuario: pagamento.assinatura.idUsuario,
      valorPago: Number(pagamento.valorPago).toFixed(2),
      metodoPagamento: pagamento.metodoPagamento,
    });

    return pagamento;
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