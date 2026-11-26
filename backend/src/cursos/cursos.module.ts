import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificacoesModule } from '../notificacoes/notificacoes.module';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';

@Module({
  imports: [PrismaModule, NotificacoesModule],
  controllers: [CursosController],
  providers: [CursosService],
})
export class CursosModule {}