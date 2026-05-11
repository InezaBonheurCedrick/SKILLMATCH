"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOpportunity = exports.updateOpportunity = exports.createOpportunity = exports.getOpportunity = exports.getAllOpportunities = void 0;
const Opportunity_1 = require("../models/Opportunity");
const catchAsync_1 = require("../utils/catchAsync");
const AppError_1 = require("../utils/AppError");
exports.getAllOpportunities = (0, catchAsync_1.catchAsync)(async (req, res) => {
    try {
        // Build query object with only valid fields
        const queryObj = {};
        // Valid fields from the schema
        const validFields = ['title', 'company', 'location', 'oppType', 'workType', 'industry', 'status', 'isFeatured'];
        // Only include valid query parameters
        Object.keys(req.query).forEach(key => {
            if (validFields.includes(key) && req.query[key]) {
                queryObj[key] = req.query[key];
            }
        });
        // Build the query - if queryObj is empty, find all
        let query = Opportunity_1.Opportunity.find(Object.keys(queryObj).length > 0 ? queryObj : {});
        // Handle sorting
        if (req.query.sort) {
            query = query.sort(req.query.sort);
        }
        else {
            query = query.sort('-createdAt');
        }
        // Execute query
        const opportunities = await query.exec();
        res.status(200).json({
            status: 'success',
            results: opportunities.length,
            data: { opportunities }
        });
    }
    catch (error) {
        console.error('Error in getAllOpportunities:', error);
        throw error;
    }
});
exports.getOpportunity = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const opportunity = await Opportunity_1.Opportunity.findById(req.params.id);
    if (!opportunity) {
        return next(new AppError_1.AppError('No opportunity found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: { opportunity }
    });
});
exports.createOpportunity = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const newOpportunity = await Opportunity_1.Opportunity.create(req.body);
    res.status(201).json({
        status: 'success',
        data: { opportunity: newOpportunity }
    });
});
exports.updateOpportunity = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const opportunity = await Opportunity_1.Opportunity.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!opportunity) {
        return next(new AppError_1.AppError('No opportunity found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: { opportunity }
    });
});
exports.deleteOpportunity = (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    const opportunity = await Opportunity_1.Opportunity.findByIdAndDelete(req.params.id);
    if (!opportunity) {
        return next(new AppError_1.AppError('No opportunity found with that ID', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null
    });
});
//# sourceMappingURL=opportunityController.js.map