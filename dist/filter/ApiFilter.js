"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ApiFilter(req, res, next) {
    console.log('In Api Filter :: Requesting URL : ', req.url);
    next();
}
exports.ApiFilter = ApiFilter;
;
//# sourceMappingURL=ApiFilter.js.map