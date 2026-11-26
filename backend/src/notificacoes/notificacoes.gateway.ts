import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificacoesGateway {
  @WebSocketServer()
  server!: Server;

  enviarParaCelular(notificacao: {
    id?: number;
    titulo: string;
    mensagem: string;
    tipo: string;
    idUsuario?: number | null;
  }) {
    this.server.emit('notificacao', notificacao);
    console.log(`[WEBSOCKET -> CELULAR] ${notificacao.titulo}`);
  }
}