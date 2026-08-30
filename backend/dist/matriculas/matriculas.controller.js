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
exports.MatriculasController = void 0;
const common_1 = require("@nestjs/common");
const matriculas_service_1 = require("./matriculas.service");
const create_matricula_dto_1 = require("./dto/create-matricula.dto");
const update_matricula_dto_1 = require("./dto/update-matricula.dto");
const swagger_1 = require("@nestjs/swagger");
let MatriculasController = class MatriculasController {
    matriculasService;
    constructor(matriculasService) {
        this.matriculasService = matriculasService;
    }
    create(createMatriculaDto) {
        return this.matriculasService.create(createMatriculaDto);
    }
    findAll() {
        return this.matriculasService.findAll();
    }
    findOne(id) {
        return this.matriculasService.findOne(+id);
    }
    update(id, updateMatriculaDto) {
        return this.matriculasService.update(+id, updateMatriculaDto);
    }
    remove(id) {
        return this.matriculasService.remove(+id);
    }
};
exports.MatriculasController = MatriculasController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar uma nova matrícula' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Criado com sucesso.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_matricula_dto_1.CreateMatriculaDto]),
    __metadata("design:returntype", void 0)
], MatriculasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todas as matrículas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista retornada com sucesso.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MatriculasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar uma matrícula pelo ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Registro encontrado.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MatriculasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar uma matrícula' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Atualizado com sucesso.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_matricula_dto_1.UpdateMatriculaDto]),
    __metadata("design:returntype", void 0)
], MatriculasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover uma matrícula' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Removido com sucesso.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MatriculasController.prototype, "remove", null);
exports.MatriculasController = MatriculasController = __decorate([
    (0, swagger_1.ApiTags)('matriculas'),
    (0, common_1.Controller)('matriculas'),
    __metadata("design:paramtypes", [matriculas_service_1.MatriculasService])
], MatriculasController);
//# sourceMappingURL=matriculas.controller.js.map