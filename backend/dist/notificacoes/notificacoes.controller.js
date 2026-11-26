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
exports.NotificacoesController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const notificacoes_service_1 = require("./notificacoes.service");
let NotificacoesController = class NotificacoesController {
    notificacoesService;
    constructor(notificacoesService) {
        this.notificacoesService = notificacoesService;
    }
    extrairDados(message) {
        const raw = message?.value ?? message;
        return typeof raw === 'string' ? JSON.parse(raw) : raw;
    }
    async onUsuarioCadastrado(message) {
        const data = this.extrairDados(message);
        console.log('[KAFKA CONSUMER] usuario-cadastrado:', data);
        await this.notificacoesService.salvarEEnviar({
            idUsuario: Number(data.idUsuario),
            tipo: 'BOAS_VINDAS',
            titulo: 'Bem-vindo à Plataforma!',
            mensagem: `Olá, ${data.nome}! Sua conta foi criada com sucesso.`,
        });
    }
    async onCursoCriado(message) {
        const data = this.extrairDados(message);
        console.log('[KAFKA CONSUMER] curso-criado:', data);
        await this.notificacoesService.salvarEEnviar({
            idUsuario: null,
            tipo: 'NOVO_CURSO',
            titulo: 'Novo curso disponível!',
            mensagem: `O curso "${data.titulo}" acabou de ser publicado.`,
        });
    }
    async onMatriculaCriada(message) {
        const data = this.extrairDados(message);
        console.log('[KAFKA CONSUMER] matricula-criada:', data);
        await this.notificacoesService.salvarEEnviar({
            idUsuario: Number(data.idUsuario),
            tipo: 'MATRICULA',
            titulo: 'Matrícula confirmada!',
            mensagem: `Você já tem acesso ao curso "${data.tituloCurso}".`,
        });
    }
    async onPagamentoAprovado(message) {
        const data = this.extrairDados(message);
        console.log('[KAFKA CONSUMER] pagamento-aprovado:', data);
        await this.notificacoesService.salvarEEnviar({
            idUsuario: Number(data.idUsuario),
            tipo: 'PAGAMENTO',
            titulo: 'Pagamento aprovado!',
            mensagem: `Pagamento de R$ ${data.valorPago} via ${data.metodoPagamento} confirmado.`,
        });
    }
    findByUsuario(idUsuario) {
        return this.notificacoesService.findByUsuario(+idUsuario);
    }
    marcarComoLida(id) {
        return this.notificacoesService.marcarComoLida(+id);
    }
};
exports.NotificacoesController = NotificacoesController;
__decorate([
    (0, microservices_1.EventPattern)('usuario-cadastrado'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificacoesController.prototype, "onUsuarioCadastrado", null);
__decorate([
    (0, microservices_1.EventPattern)('curso-criado'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificacoesController.prototype, "onCursoCriado", null);
__decorate([
    (0, microservices_1.EventPattern)('matricula-criada'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificacoesController.prototype, "onMatriculaCriada", null);
__decorate([
    (0, microservices_1.EventPattern)('pagamento-aprovado'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificacoesController.prototype, "onPagamentoAprovado", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Get)('usuario/:idUsuario'),
    __param(0, (0, common_1.Param)('idUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificacoesController.prototype, "findByUsuario", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Patch)(':id/lida'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificacoesController.prototype, "marcarComoLida", null);
exports.NotificacoesController = NotificacoesController = __decorate([
    (0, swagger_1.ApiTags)('notificacoes'),
    (0, common_1.Controller)('notificacoes'),
    __metadata("design:paramtypes", [notificacoes_service_1.NotificacoesService])
], NotificacoesController);
//# sourceMappingURL=notificacoes.controller.js.map