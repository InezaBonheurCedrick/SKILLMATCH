"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const applicationSchema = new mongoose_1.default.Schema({
    opportunityId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Opportunity',
        required: true
    },
    fullName: { type: String, required: [true, 'Full name is required'] },
    email: { type: String, required: [true, 'Email is required'], lowercase: true },
    phone: { type: String, required: [true, 'Phone number is required'] },
    resumeUrl: { type: String, required: [true, 'Resume link is required'] },
    coverLetter: { type: String },
    status: {
        type: String,
        enum: ['New', 'Reviewed', 'Shortlisted', 'Rejected', 'Contacted'],
        default: 'New'
    },
    adminNotes: { type: String }
}, { timestamps: true });
exports.Application = mongoose_1.default.model('Application', applicationSchema);
//# sourceMappingURL=Application.js.map