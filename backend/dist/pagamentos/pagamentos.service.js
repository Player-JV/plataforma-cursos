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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagamentosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notificacoes_service_1 = require("../notificacoes/notificacoes.service");
let PagamentosService = class PagamentosService {
    prisma;
    notificacoesService;
    constructor(prisma, notificacoesService) {
        this.prisma = prisma;
        this.notificacoesService = notificacoesService;
    }
    async create(createPagamentoDto) {
        const pagamento = await this.prisma.pagamento.create({
            data: createPagamentoDto,
            include: { assinatura: true },
        });
        await this.notificacoesService.emitirEvento('pagamento-aprovado', {
            idUsuario: pagamento.assinatura.idUsuario,
            valorPago: Number(pagamento.valorPago).toFixed(2),
            metodoPagamento: pagamento.metodoPagamento,
        });
        return pagamento;
    }
    findAll() {
        return this.prisma.pagamento.findMany({
            include: { assinatura: true },
        });
    }
    findOne(id) {
        return this.prisma.pagamento.findUnique({
            where: { id },
            include: { assinatura: true },
        });
    }
    update(id, updatePagamentoDto) {
        return this.prisma.pagamento.update({
            where: { id },
            data: updatePagamentoDto,
        });
    }
    remove(id) {
        return this.prisma.pagamento.delete({ where: { id } });
    }
};
exports.PagamentosService = PagamentosService;
exports.PagamentosService = PagamentosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notificacoes_service_1.NotificacoesService])
], PagamentosService);
//# sourceMappingURL=pagamentos.service.js.map