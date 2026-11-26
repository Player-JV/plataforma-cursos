import { NotificacoesService } from './notificacoes.service';
export declare class NotificacoesController {
    private readonly notificacoesService;
    constructor(notificacoesService: NotificacoesService);
    private extrairDados;
    onUsuarioCadastrado(message: any): Promise<void>;
    onCursoCriado(message: any): Promise<void>;
    onMatriculaCriada(message: any): Promise<void>;
    onPagamentoAprovado(message: any): Promise<void>;
    findByUsuario(idUsuario: string): import(".prisma/client").Prisma.PrismaPromise<{
        titulo: string;
        mensagem: string;
        tipo: string;
        lida: boolean;
        criadaEm: Date;
        id: number;
        idUsuario: number | null;
    }[]>;
    marcarComoLida(id: string): import(".prisma/client").Prisma.Prisma__NotificacaoClient<{
        titulo: string;
        mensagem: string;
        tipo: string;
        lida: boolean;
        criadaEm: Date;
        id: number;
        idUsuario: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
