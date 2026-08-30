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
exports.MatriculasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MatriculasService = class MatriculasService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createMatriculaDto) {
        return this.prisma.matricula.create({ data: createMatriculaDto });
    }
    findAll() {
        return this.prisma.matricula.findMany({
            include: { usuario: true, curso: true },
        });
    }
    findOne(id) {
        return this.prisma.matricula.findUnique({
            where: { id },
            include: { usuario: true, curso: true },
        });
    }
    update(id, updateMatriculaDto) {
        return this.prisma.matricula.update({
            where: { id },
            data: updateMatriculaDto,
        });
    }
    remove(id) {
        return this.prisma.matricula.delete({ where: { id } });
    }
};
exports.MatriculasService = MatriculasService;
exports.MatriculasService = MatriculasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MatriculasService);
//# sourceMappingURL=matriculas.service.js.map