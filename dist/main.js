"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("app.module");
const passport_1 = require("@nestjs/passport");
const RestExceptionHandler_1 = require("exception/handler/RestExceptionHandler");
const ForbiddenExceptionHandler_1 = require("exception/handler/ForbiddenExceptionHandler");
const ApiFilter_1 = require("./filter/ApiFilter");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.useGlobalGuards(new (passport_1.AuthGuard('jwt'))());
        app.useGlobalFilters(new RestExceptionHandler_1.RestExceptionFilter(), new ForbiddenExceptionHandler_1.ForbiddenExceptionHandler());
        app.use(ApiFilter_1.ApiFilter);
        yield app.listen(3000);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map