"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMatriculaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_matricula_dto_1 = require("./create-matricula.dto");
class UpdateMatriculaDto extends (0, swagger_1.PartialType)(create_matricula_dto_1.CreateMatriculaDto) {
}
exports.UpdateMatriculaDto = UpdateMatriculaDto;
//# sourceMappingURL=update-matricula.dto.js.map