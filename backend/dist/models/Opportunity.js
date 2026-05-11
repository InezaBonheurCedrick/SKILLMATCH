"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Opportunity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const opportunitySchema = new mongoose_1.default.Schema({
    title: { type: String, required: [true, 'A job title is required'] },
    company: { type: String, required: [true, 'Company name is required'] },
    location: { type: String, required: true },
    oppType: {
        type: String,
        enum: ['Job', 'Internship', 'Scholarship', 'Tender', 'Consultancy'],
        required: true
    },
    workType: {
        type: String,
        enum: ['Full Time', 'Part Time', 'Contract', 'Remote', 'Hybrid'],
        required: true
    },
    industry: { type: String, required: true },
    status: {
        type: String,
        enum: ['Active', 'Draft', 'Closed', 'Archived'],
        default: 'Active'
    },
    salary: { type: String, default: 'Competitive' },
    deadline: { type: Date, required: true },
    isFeatured: { type: Boolean, default: false },
    tags: [String],
    logo: String,
    description: { type: String, required: true },
    responsibilities: [String],
    requirements: [String],
    benefits: [String],
    aboutCompany: String,
}, { timestamps: true });
exports.Opportunity = mongoose_1.default.model('Opportunity', opportunitySchema);
//# sourceMappingURL=Opportunity.js.map