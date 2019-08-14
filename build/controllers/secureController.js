"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const http_status_codes_1 = require("http-status-codes");
const logger_1 = require("@overnightjs/logger");
const jwt_1 = require("@overnightjs/jwt");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
let SecureController = class SecureController {
    constructor() {
        this.logger = new logger_1.Logger();
    }
    get(req, res) {
        return res.status(http_status_codes_1.OK).json({
            user: req.payload
        });
    }
};
tslib_1.__decorate([
    core_1.Get("secret"),
    core_1.Middleware(jwt_1.JwtManager.middleware),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], SecureController.prototype, "get", null);
SecureController = tslib_1.__decorate([
    core_1.Controller("api/users"),
    tslib_1.__metadata("design:paramtypes", [])
], SecureController);
exports.SecureController = SecureController;
//# sourceMappingURL=secureController.js.map