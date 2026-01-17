import { Request, Response } from 'express';
import { Opportunity } from '../models/Opportunity';
import { Application } from '../models/Application';
import { catchAsync } from '../utils/catchAsync';

export const getDashboardStats = catchAsync(async (req: Request, res: Response) => {
  const totalOpportunities = await Opportunity.countDocuments();

  const totalApplicants = await Application.countDocuments();

  const activeNow = await Opportunity.countDocuments({
    status: 'Active',
    deadline: { $gte: new Date() }
  });

  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  const closingSoon = await Opportunity.countDocuments({
    status: 'Active',
    deadline: { $gte: new Date(), $lte: nextWeek }
  });

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  const opportunitiesLast30Days = await Opportunity.countDocuments({
    createdAt: { $gte: thirtyDaysAgo }
  });

  const opportunitiesPrevious30Days = await Opportunity.countDocuments({
    createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }
  });

  const applicantsLast30Days = await Application.countDocuments({
    createdAt: { $gte: thirtyDaysAgo }
  });

  const applicantsPrevious30Days = await Application.countDocuments({
    createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }
  });

  let opportunitiesChangeNum: number;
  if (opportunitiesPrevious30Days > 0) {
    opportunitiesChangeNum = ((opportunitiesLast30Days - opportunitiesPrevious30Days) / opportunitiesPrevious30Days * 100);
  } else {
    opportunitiesChangeNum = opportunitiesLast30Days > 0 ? 100 : 0;
  }

  let applicantsChangeNum: number;
  if (applicantsPrevious30Days > 0) {
    applicantsChangeNum = ((applicantsLast30Days - applicantsPrevious30Days) / applicantsPrevious30Days * 100);
  } else {
    applicantsChangeNum = applicantsLast30Days > 0 ? 100 : 0;
  }

  const opportunitiesChange: string = opportunitiesChangeNum.toFixed(1);
  const applicantsChange: string = applicantsChangeNum.toFixed(1);

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

export const getRecentOpportunities = catchAsync(async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 5;
  
  const opportunities = await Opportunity.find()
    .sort('-createdAt')
    .limit(limit)
    .lean();

  const opportunitiesWithCounts = await Promise.all(
    opportunities.map(async (opp) => {
      const applicantCount = await Application.countDocuments({ opportunityId: opp._id });
      return {
        ...opp,
        applicants: applicantCount,
        posted: formatTimeAgo(opp.createdAt as Date)
      };
    })
  );

  res.status(200).json({
    status: 'success',
    results: opportunitiesWithCounts.length,
    data: {
      opportunities: opportunitiesWithCounts
    }
  });
});

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  return `${Math.floor(diffInSeconds / 2592000)} months ago`;
}