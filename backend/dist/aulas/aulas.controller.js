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
exports.AulasController = void 0;
const common_1 = require("@nestjs/common");
const aulas_service_1 = require("./aulas.service");
const create_aula_dto_1 = require("./dto/create-aula.dto");
const update_aula_dto_1 = require("./dto/update-aula.dto");
const swagger_1 = require("@nestjs/swagger");
let AulasController = class AulasController {
    aulasService;
    constructor(aulasService) {
        this.aulasService = aulasService;
    }
    create(createAulaDto) {
        return this.aulasService.create(createAulaDto);
    }
    findAll() {
        return this.aulasService.findAll();
    }
    findOne(id) {
        return this.aulasService.findOne(+id);
    }
    update(id, updateAulaDto) {
        return this.aulasService.update(+id, updateAulaDto);
    }
    remove(id) {
        return this.aulasService.remove(+id);
    }
};
exports.AulasController = AulasController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar uma nova aula' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Criado com sucesso.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_aula_dto_1.CreateAulaDto]),
    __metadata("design:returntype", void 0)
], AulasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todas as aulas' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista retornada com sucesso.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AulasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar uma aula pelo ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Registro encontrado.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AulasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar uma aula' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Atualizado com sucesso.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_aula_dto_1.UpdateAulaDto]),
    __metadata("design:returntype", void 0)
], AulasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover uma aula' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Removido com sucesso.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AulasController.prototype, "remove", null);
exports.AulasController = AulasController = __decorate([
    (0, swagger_1.ApiTags)('aulas'),
    (0, common_1.Controller)('aulas'),
    __metadata("design:paramtypes", [aulas_service_1.AulasService])
], AulasController);
//# sourceMappingURL=aulas.controller.js.map