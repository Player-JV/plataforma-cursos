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
exports.ModulosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ModulosService = class ModulosService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createModuloDto) {
        return this.prisma.modulo.create({ data: createModuloDto });
    }
    findAll() {
        return this.prisma.modulo.findMany({
            include: { curso: true },
        });
    }
    findOne(id) {
        return this.prisma.modulo.findUnique({
            where: { id },
            include: { curso: true, aulas: true },
        });
    }
    update(id, updateModuloDto) {
        return this.prisma.modulo.update({
            where: { id },
            data: updateModuloDto,
        });
    }
    remove(id) {
        return this.prisma.modulo.delete({ where: { id } });
    }
};
exports.ModulosService = ModulosService;
exports.ModulosService = ModulosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ModulosService);
//# sourceMappingURL=modulos.service.js.map