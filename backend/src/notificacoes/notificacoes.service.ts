import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import { NotificacoesGateway } from './notificacoes.gateway';

@Injectable()
export class NotificacoesService implements OnModuleInit {
  constructor(
    private prisma: PrismaService,
    private gateway: NotificacoesGateway,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    try {
      await this.kafkaClient.connect();
      console.log('[KAFKA PRODUCER] Conectado ao broker com sucesso.');
    } catch {
      console.warn('[KAFKA PRODUCER] Aviso: Kafka indisponível no momento.');
    }
  }

  async emitirEvento(topico: string, payload: Record<string, any>) {
    try {
      await lastValueFrom(this.kafkaClient.emit(topico, payload));
      console.log(`[KAFKA PRODUCER] Evento "${topico}" publicado:`, payload);
    } catch (error) {
      console.error(`[KAFKA PRODUCER] Erro ao publicar em "${topico}":`, error);
    }
  }

  async salvarEEnviar(dados: {
    titulo: string;
    mensagem: string;
    tipo: string;
    idUsuario?: number | null;
  }) {
    const salva = await this.prisma.notificacao.create({
      data: {
        titulo: dados.titulo,
        mensagem: dados.mensagem,
        tipo: dados.tipo,
        idUsuario: dados.idUsuario ?? null,
      },
    });

    this.gateway.enviarParaCelular(salva);
    return salva;
  }

  findByUsuario(idUsuario: number) {
    return this.prisma.notificacao.findMany({
      where: {
        OR: [{ idUsuario }, { idUsuario: null }],
      },
      orderBy: { criadaEm: 'desc' },
    });
  }

  marcarComoLida(id: number) {
    return this.prisma.notificacao.update({
      where: { id },
      data: { lida: true },
    });
  }
}