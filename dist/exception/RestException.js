"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class RestException extends common_1.HttpException {
    constructor() {
        super('RestException', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.default = RestException;
//# sourceMappingURL=RestException.js.map