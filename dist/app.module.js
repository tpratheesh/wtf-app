"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const TicketController_1 = require("controller/TicketController");
const TicketService_1 = require("service/TicketService");
const UserService_1 = require("service/UserService");
const AuthService_1 = require("service/auth/AuthService");
const JwtStrategy_1 = require("strategy/JwtStrategy");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        controllers: [TicketController_1.TicketController],
        providers: [TicketService_1.TicketService, UserService_1.UserService, AuthService_1.AuthService, JwtStrategy_1.JwtStrategy],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map