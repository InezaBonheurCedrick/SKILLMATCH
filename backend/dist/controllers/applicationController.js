"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApplicationStatus = exports.getAllApplications = exports.submitApplication = void 0;
const Application_1 = require("../models/Application");
const Opportunity_1 = require("../models/Opportunity");
const catchAsync_1 = require("../utils/catchAsync");
const AppError_1 = require("../utils/AppError");
exports.submitApplication = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const job = await Opportunity_1.Opportunity.findById(req.body.opportunityId);
    if (!job) {
        return next(new AppError_1.AppError('The job you are applying for does not exist.', 404));
    }
    const newApplication = await Application_1.Application.create(req.body);
    res.status(201).json({
        status: 'success',
        message: 'Application submitted successfully!',
        data: { application: newApplication }
    });
});
exports.getAllApplications = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const filter = {};
    if (req.query.status)
        filter.status = req.query.status;
    if (req.query.opportunityId)
        filter.opportunityId = req.query.opportunityId;
    const applications = await Application_1.Application.find(filter)
        .populate('opportunityId', 'title company')
        .sort('-createdAt');
    res.status(200).json({
        status: 'success',
        results: applications.length,
        data: { applications }
    });
});
exports.updateApplicationStatus = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const { status, adminNotes } = req.body;
    const application = await Application_1.Application.findByIdAndUpdate(req.params.id, { status, adminNotes }, { new: true, runValidators: true });
    if (!application) {
        return next(new AppError_1.AppError('No application found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: { application }
    });
});
//# sourceMappingURL=applicationController.js.map