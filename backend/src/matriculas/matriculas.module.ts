import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificacoesModule } from '../notificacoes/notificacoes.module';
import { MatriculasService } from './matriculas.service';
import { MatriculasController } from './matriculas.controller';

@Module({
  imports: [PrismaModule, NotificacoesModule],
  controllers: [MatriculasController],
  providers: [MatriculasService],
})
export class MatriculasModule {}