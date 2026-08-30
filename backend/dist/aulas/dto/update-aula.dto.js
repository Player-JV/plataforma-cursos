"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAulaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_aula_dto_1 = require("./create-aula.dto");
class UpdateAulaDto extends (0, swagger_1.PartialType)(create_aula_dto_1.CreateAulaDto) {
}
exports.UpdateAulaDto = UpdateAulaDto;
//# sourceMappingURL=update-aula.dto.js.map