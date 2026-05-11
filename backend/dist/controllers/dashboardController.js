"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentOpportunities = exports.getDashboardStats = void 0;
const Opportunity_1 = require("../models/Opportunity");
const Application_1 = require("../models/Application");
const catchAsync_1 = require("../utils/catchAsync");
exports.getDashboardStats = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const totalOpportunities = await Opportunity_1.Opportunity.countDocuments();
    const totalApplicants = await Application_1.Application.countDocuments();
    const activeNow = await Opportunity_1.Opportunity.countDocuments({
        status: 'Active',
        deadline: { $gte: new Date() }
    });
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const closingSoon = await Opportunity_1.Opportunity.countDocuments({
        status: 'Active',
        deadline: { $gte: new Date(), $lte: nextWeek }
    });
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
    const opportunitiesLast30Days = await Opportunity_1.Opportunity.countDocuments({
        createdAt: { $gte: thirtyDaysAgo }
    });
    const opportunitiesPrevious30Days = await Opportunity_1.Opportunity.countDocuments({
        createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }
    });
    const applicantsLast30Days = await Application_1.Application.countDocuments({
        createdAt: { $gte: thirtyDaysAgo }
    });
    const applicantsPrevious30Days = await Application_1.Application.countDocuments({
        createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }
    });
    let opportunitiesChangeNum;
    if (opportunitiesPrevious30Days > 0) {
        opportunitiesChangeNum = ((opportunitiesLast30Days - opportunitiesPrevious30Days) / opportunitiesPrevious30Days * 100);
    }
    else {
        opportunitiesChangeNum = opportunitiesLast30Days > 0 ? 100 : 0;
    }
    let applicantsChangeNum;
    if (applicantsPrevious30Days > 0) {
        applicantsChangeNum = ((applicantsLast30Days - applicantsPrevious30Days) / applicantsPrevious30Days * 100);
    }
    else {
        applicantsChangeNum = applicantsLast30Days > 0 ? 100 : 0;
    }
    const opportunitiesChange = opportunitiesChangeNum.toFixed(1);
    const applicantsChange = applicantsChangeNum.toFixed(1);
    res.status(200).json({
        status: 'success',
        data: {
            stats: [
                {
                    label: 'Total Opportunities',
                    value: totalOpportunities,
                    change: `${opportunitiesChangeNum > 0 ? '+' : ''}${opportunitiesChange}%`,
                    trend: opportunitiesChangeNum > 0 ? 'up' : opportunitiesChangeNum < 0 ? 'down' : 'neutral'
                },
                {
                    label: 'Total Applicants',
                    value: totalApplicants,
                    change: `${applicantsChangeNum > 0 ? '+' : ''}${applicantsChange}%`,
                    trend: applicantsChangeNum > 0 ? 'up' : applicantsChangeNum < 0 ? 'down' : 'neutral'
                },
                {
                    label: 'Active Now',
                    value: activeNow,
                    change: '0%',
                    trend: 'neutral'
                },
                {
                    label: 'Closing Soon',
                    value: closingSoon,
                    change: closingSoon > 0 ? `-${closingSoon}` : '0',
                    trend: closingSoon > 0 ? 'down' : 'neutral'
                }
            ]
        }
    });
});
exports.getRecentOpportunities = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const limit = parseInt(req.query.limit) || 5;
    const opportunities = await Opportunity_1.Opportunity.find()
        .sort('-createdAt')
        .limit(limit)
        .lean();
    const opportunitiesWithCounts = await Promise.all(opportunities.map(async (opp) => {
        const applicantCount = await Application_1.Application.countDocuments({ opportunityId: opp._id });
        return {
            ...opp,
            applicants: applicantCount,
            posted: formatTimeAgo(opp.createdAt)
        };
    }));
    res.status(200).json({
        status: 'success',
        results: opportunitiesWithCounts.length,
        data: {
            opportunities: opportunitiesWithCounts
        }
    });
});
function formatTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 60)
        return 'Just now';
    if (diffInSeconds < 3600)
        return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
        return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 2592000)
        return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
}
//# sourceMappingURL=dashboardController.js.map