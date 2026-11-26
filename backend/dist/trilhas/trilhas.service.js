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
exports.TrilhasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TrilhasService = class TrilhasService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createTrilhaDto) {
        return this.prisma.trilha.create({ data: createTrilhaDto });
    }
    findAll() {
        return this.prisma.trilha.findMany({
            include: {
                categoria: true,
                cursos: {
                    orderBy: { ordem: 'asc' },
                    include: { curso: true },
                },
            },
        });
    }
    findOne(id) {
        return this.prisma.trilha.findUnique({
            where: { id },
            include: {
                categoria: true,
                cursos: {
                    orderBy: { ordem: 'asc' },
                    include: { curso: true },
                },
            },
        });
    }
    update(id, updateTrilhaDto) {
        return this.prisma.trilha.update({
            where: { id },
            data: updateTrilhaDto,
        });
    }
    remove(id) {
        return this.prisma.trilha.delete({ where: { id } });
    }
};
exports.TrilhasService = TrilhasService;
exports.TrilhasService = TrilhasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TrilhasService);
//# sourceMappingURL=trilhas.service.js.map