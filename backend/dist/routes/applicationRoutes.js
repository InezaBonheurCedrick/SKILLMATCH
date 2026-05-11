"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const applicationController_1 = require("../controllers/applicationController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/submit', applicationController_1.submitApplication);
router.use(authMiddleware_1.protect);
router.get('/', applicationController_1.getAllApplications);
router.patch('/:id/status', applicationController_1.updateApplicationStatus);
exports.default = router;
//# sourceMappingURL=applicationRoutes.js.map