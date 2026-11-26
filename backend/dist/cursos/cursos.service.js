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
exports.CursosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notificacoes_service_1 = require("../notificacoes/notificacoes.service");
let CursosService = class CursosService {
    prisma;
    notificacoesService;
    constructor(prisma, notificacoesService) {
        this.prisma = prisma;
        this.notificacoesService = notificacoesService;
    }
    async create(createCursoDto) {
        const curso = await this.prisma.curso.create({ data: createCursoDto });
        await this.notificacoesService.emitirEvento('curso-criado', {
            idCurso: curso.id,
            titulo: curso.titulo,
        });
        return curso;
    }
    findAll() {
        return this.prisma.curso.findMany({
            include: { categoria: true, instrutor: true },
        });
    }
    findOne(id) {
        return this.prisma.curso.findUnique({
            where: { id },
            include: {
                categoria: true,
                instrutor: true,
                modulos: {
                    orderBy: { ordem: 'asc' },
                    include: {
                        aulas: { orderBy: { ordem: 'asc' } },
                    },
                },
            },
        });
    }
    update(id, updateCursoDto) {
        return this.prisma.curso.update({
            where: { id },
            data: updateCursoDto,
        });
    }
    remove(id) {
        return this.prisma.curso.delete({ where: { id } });
    }
};
exports.CursosService = CursosService;
exports.CursosService = CursosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notificacoes_service_1.NotificacoesService])
], CursosService);
//# sourceMappingURL=cursos.service.js.map