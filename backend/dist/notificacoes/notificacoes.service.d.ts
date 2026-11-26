import { OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { NotificacoesGateway } from './notificacoes.gateway';
export declare class NotificacoesService implements OnModuleInit {
    private prisma;
    private gateway;
    private readonly kafkaClient;
    constructor(prisma: PrismaService, gateway: NotificacoesGateway, kafkaClient: ClientKafka);
    onModuleInit(): Promise<void>;
    emitirEvento(topico: string, payload: Record<string, any>): Promise<void>;
    salvarEEnviar(dados: {
        titulo: string;
        mensagem: string;
        tipo: string;
        idUsuario?: number | null;
    }): Promise<{
        titulo: string;
        mensagem: string;
        tipo: string;
        lida: boolean;
        criadaEm: Date;
        id: number;
        idUsuario: number | null;
    }>;
    findByUsuario(idUsuario: number): import(".prisma/client").Prisma.PrismaPromise<{
        titulo: string;
        mensagem: string;
        tipo: string;
        lida: boolean;
        criadaEm: Date;
        id: number;
        idUsuario: number | null;
    }[]>;
    marcarComoLida(id: number): import(".prisma/client").Prisma.Prisma__NotificacaoClient<{
        titulo: string;
        mensagem: string;
        tipo: string;
        lida: boolean;
        criadaEm: Date;
        id: number;
        idUsuario: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
