"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const Ticket_1 = require("model/Ticket");
let TicketService = class TicketService {
    getOpenTickets() {
        let tickets = [];
        tickets.push(new Ticket_1.default(1, 'Ticket 01', 'Ticket 01 Description'));
        tickets.push(new Ticket_1.default(2, 'Ticket 02', 'Ticket 02 Description'));
        tickets.push(new Ticket_1.default(3, 'Ticket 03', 'Ticket 03 Description'));
        tickets.push(new Ticket_1.default(4, 'Ticket 04', 'Ticket 04 Description'));
        return tickets;
    }
    getClosedTickets() {
        let tickets = [];
        tickets.push(new Ticket_1.default(5, 'Ticket 05', 'Ticket 05 Description'));
        tickets.push(new Ticket_1.default(6, 'Ticket 06', 'Ticket 06 Description'));
        return tickets;
    }
    saveTicket(ticketForm) {
        new Ticket_1.default(ticketForm.id, ticketForm.name, ticketForm.description);
    }
    deleteTicket(ticketId) {
        console.log(ticketId);
    }
};
TicketService = __decorate([
    common_1.Injectable()
], TicketService);
exports.TicketService = TicketService;
//# sourceMappingURL=TicketService.js.map