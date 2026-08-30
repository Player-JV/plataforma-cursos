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
exports.ModulosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const modulos_service_1 = require("./modulos.service");
const create_modulo_dto_1 = require("./dto/create-modulo.dto");
const update_modulo_dto_1 = require("./dto/update-modulo.dto");
let ModulosController = class ModulosController {
    modulosService;
    constructor(modulosService) {
        this.modulosService = modulosService;
    }
    create(createModuloDto) {
        return this.modulosService.create(createModuloDto);
    }
    findAll() {
        return this.modulosService.findAll();
    }
    findOne(id) {
        return this.modulosService.findOne(+id);
    }
    update(id, updateModuloDto) {
        return this.modulosService.update(+id, updateModuloDto);
    }
    remove(id) {
        return this.modulosService.remove(+id);
    }
};
exports.ModulosController = ModulosController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar um novo módulo' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Módulo criado com sucesso.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_modulo_dto_1.CreateModuloDto]),
    __metadata("design:returntype", void 0)
], ModulosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os módulos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ModulosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar módulo por ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModulosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar módulo' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_modulo_dto_1.UpdateModuloDto]),
    __metadata("design:returntype", void 0)
], ModulosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover módulo' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ModulosController.prototype, "remove", null);
exports.ModulosController = ModulosController = __decorate([
    (0, swagger_1.ApiTags)('modulos'),
    (0, common_1.Controller)('modulos'),
    __metadata("design:paramtypes", [modulos_service_1.ModulosService])
], ModulosController);
//# sourceMappingURL=modulos.controller.js.map