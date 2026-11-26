import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificacoesController } from './notificacoes.controller';
import { NotificacoesGateway } from './notificacoes.gateway';
import { NotificacoesService } from './notificacoes.service';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'plataforma-cursos',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'notificacoes-producer-client',
          },
        },
      },
    ]),
  ],
  controllers: [NotificacoesController],
  providers: [NotificacoesService, NotificacoesGateway],
  exports: [NotificacoesService],
})
export class NotificacoesModule {}