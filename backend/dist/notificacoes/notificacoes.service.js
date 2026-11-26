"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificacoesService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const prisma_service_1 = require("../prisma/prisma.service");
const notificacoes_gateway_1 = require("./notificacoes.gateway");
let NotificacoesService = class NotificacoesService {
    prisma;
    gateway;
    kafkaClient;
    constructor(prisma, gateway, kafkaClient) {
        this.prisma = prisma;
        this.gateway = gateway;
        this.kafkaClient = kafkaClient;
    }
    async onModuleInit() {
        try {
            await this.kafkaClient.connect();
            console.log('[KAFKA PRODUCER] Conectado ao broker com sucesso.');
        }
        catch {
            console.warn('[KAFKA PRODUCER] Aviso: Kafka indisponível no momento.');
        }
    }
    async emitirEvento(topico, payload) {
        try {
            await (0, rxjs_1.lastValueFrom)(this.kafkaClient.emit(topico, payload));
            console.log(`[KAFKA PRODUCER] Evento "${topico}" publicado:`, payload);
        }
        catch (error) {
            console.error(`[KAFKA PRODUCER] Erro ao publicar em "${topico}":`, error);
        }
    }
    async salvarEEnviar(dados) {
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
    findByUsuario(idUsuario) {
        return this.prisma.notificacao.findMany({
            where: {
                OR: [{ idUsuario }, { idUsuario: null }],
            },
            orderBy: { criadaEm: 'desc' },
        });
    }
    marcarComoLida(id) {
        return this.prisma.notificacao.update({
            where: { id },
            data: { lida: true },
        });
    }
};
exports.NotificacoesService = NotificacoesService;
exports.NotificacoesService = NotificacoesService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)('KAFKA_SERVICE')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notificacoes_gateway_1.NotificacoesGateway,
        microservices_1.ClientKafka])
], NotificacoesService);
//# sourceMappingURL=notificacoes.service.js.map