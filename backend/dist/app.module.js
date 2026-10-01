"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const usuarios_module_1 = require("./usuarios/usuarios.module");
const categorias_module_1 = require("./categorias/categorias.module");
const cursos_module_1 = require("./cursos/cursos.module");
const modulos_module_1 = require("./modulos/modulos.module");
const aulas_module_1 = require("./aulas/aulas.module");
const matriculas_module_1 = require("./matriculas/matriculas.module");
const trilhas_module_1 = require("./trilhas/trilhas.module");
const planos_module_1 = require("./planos/planos.module");
const assinaturas_module_1 = require("./assinaturas/assinaturas.module");
const pagamentos_module_1 = require("./pagamentos/pagamentos.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, usuarios_module_1.UsuariosModule, categorias_module_1.CategoriasModule, cursos_module_1.CursosModule, modulos_module_1.ModulosModule, aulas_module_1.AulasModule, matriculas_module_1.MatriculasModule, trilhas_module_1.TrilhasModule, planos_module_1.PlanosModule, assinaturas_module_1.AssinaturasModule, pagamentos_module_1.PagamentosModule, auth_module_1.AuthModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map