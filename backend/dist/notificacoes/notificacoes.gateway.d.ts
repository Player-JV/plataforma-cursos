import { Server } from 'socket.io';
export declare class NotificacoesGateway {
    server: Server;
    enviarParaCelular(notificacao: {
        id?: number;
        titulo: string;
        mensagem: string;
        tipo: string;
        idUsuario?: number | null;
    }): void;
}
