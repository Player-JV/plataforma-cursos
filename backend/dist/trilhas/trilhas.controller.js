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
exports.TrilhasController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const trilhas_service_1 = require("./trilhas.service");
const create_trilha_dto_1 = require("./dto/create-trilha.dto");
const update_trilha_dto_1 = require("./dto/update-trilha.dto");
let TrilhasController = class TrilhasController {
    trilhasService;
    constructor(trilhasService) {
        this.trilhasService = trilhasService;
    }
    create(createTrilhaDto) {
        return this.trilhasService.create(createTrilhaDto);
    }
    findAll() {
        return this.trilhasService.findAll();
    }
    findOne(id) {
        return this.trilhasService.findOne(+id);
    }
    update(id, updateTrilhaDto) {
        return this.trilhasService.update(+id, updateTrilhaDto);
    }
    remove(id) {
        return this.trilhasService.remove(+id);
    }
};
exports.TrilhasController = TrilhasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_trilha_dto_1.CreateTrilhaDto]),
    __metadata("design:returntype", void 0)
], TrilhasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TrilhasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrilhasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_trilha_dto_1.UpdateTrilhaDto]),
    __metadata("design:returntype", void 0)
], TrilhasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrilhasController.prototype, "remove", null);
exports.TrilhasController = TrilhasController = __decorate([
    (0, swagger_1.ApiTags)('trilhas'),
    (0, swagger_1.ApiBearerAuth)('token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('trilhas'),
    __metadata("design:paramtypes", [trilhas_service_1.TrilhasService])
], TrilhasController);
//# sourceMappingURL=trilhas.controller.js.map