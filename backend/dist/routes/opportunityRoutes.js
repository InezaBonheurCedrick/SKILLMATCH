"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const opportunityController_1 = require("../controllers/opportunityController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route('/')
    .get(opportunityController_1.getAllOpportunities)
    .post(authMiddleware_1.protect, opportunityController_1.createOpportunity);
router.route('/:id')
    .get(opportunityController_1.getOpportunity)
    .patch(authMiddleware_1.protect, opportunityController_1.updateOpportunity)
    .delete(authMiddleware_1.protect, opportunityController_1.deleteOpportunity);
exports.default = router;
//# sourceMappingURL=opportunityRoutes.js.map