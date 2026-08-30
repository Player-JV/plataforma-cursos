"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTrilhaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_trilha_dto_1 = require("./create-trilha.dto");
class UpdateTrilhaDto extends (0, swagger_1.PartialType)(create_trilha_dto_1.CreateTrilhaDto) {
}
exports.UpdateTrilhaDto = UpdateTrilhaDto;
//# sourceMappingURL=update-trilha.dto.js.map