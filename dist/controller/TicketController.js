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
const common_1 = require("@nestjs/common");
const TicketService_1 = require("service/TicketService");
const TicketForm_1 = require("form/TicketForm");
const SuccessResponse_1 = require("model/common/SuccessResponse");
const RestException_1 = require("exception/RestException");
let TicketController = class TicketController {
    constructor(ticketService) {
        this.ticketService = ticketService;
    }
    openTickets() {
        return this.ticketService.getOpenTickets();
    }
    closedTickets() {
        return this.ticketService.getClosedTickets();
    }
    createTicket(ticketForm) {
        this.ticketService.saveTicket(ticketForm);
        return new SuccessResponse_1.default('Ticket Created Successfully');
    }
    updateTicket(req, ticketForm) {
        this.ticketService.saveTicket(ticketForm);
        return new SuccessResponse_1.default('Ticket Updated Successfully');
    }
    deleteTicket(req, params) {
        this.ticketService.deleteTicket(params.id);
        return new SuccessResponse_1.default('Ticket Deleted Successfully');
    }
    exceptionTickets() {
        throw new RestException_1.default();
    }
};
__decorate([
    common_1.Get('ticket/list/open'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], TicketController.prototype, "openTickets", null);
__decorate([
    common_1.Get('ticket/list/closed'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], TicketController.prototype, "closedTickets", null);
__decorate([
    common_1.Put('ticket'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TicketForm_1.default]),
    __metadata("design:returntype", SuccessResponse_1.default)
], TicketController.prototype, "createTicket", null);
__decorate([
    common_1.Post('ticket'),
    __param(0, common_1.Req()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, TicketForm_1.default]),
    __metadata("design:returntype", SuccessResponse_1.default)
], TicketController.prototype, "updateTicket", null);
__decorate([
    common_1.Delete('ticket/:id'),
    __param(0, common_1.Req()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", SuccessResponse_1.default)
], TicketController.prototype, "deleteTicket", null);
__decorate([
    common_1.Get('ticket/exception'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], TicketController.prototype, "exceptionTickets", null);
TicketController = __decorate([
    common_1.Controller('api'),
    __metadata("design:paramtypes", [TicketService_1.TicketService])
], TicketController);
exports.TicketController = TicketController;
//# sourceMappingURL=TicketController.js.map