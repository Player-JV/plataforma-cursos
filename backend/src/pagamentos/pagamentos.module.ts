import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificacoesModule } from '../notificacoes/notificacoes.module';
import { PagamentosService } from './pagamentos.service';
import { PagamentosController } from './pagamentos.controller';

@Module({
  imports: [PrismaModule, NotificacoesModule],
  controllers: [PagamentosController],
  providers: [PagamentosService],
})
export class PagamentosModule {}