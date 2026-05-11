"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/signup', authController_1.signup);
router.post('/signin', authController_1.signin);
router.post('/logout', authController_1.logout);
router.use(authMiddleware_1.protect);
router.patch('/change-password', authController_1.changePassword);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map