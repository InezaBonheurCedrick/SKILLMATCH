import { Request, Response, NextFunction } from 'express';
import { Opportunity } from '../models/Opportunity';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';

export const getAllOpportunities = catchAsync(async (req: Request, res: Response) => {
  try {
    // Build query object with only valid fields
    const queryObj: any = {};
    
    // Valid fields from the schema
    const validFields = ['title', 'company', 'location', 'oppType', 'workType', 'industry', 'status', 'isFeatured'];
    
    // Only include valid query parameters
    Object.keys(req.query).forEach(key => {
      if (validFields.includes(key) && req.query[key]) {
        queryObj[key] = req.query[key];
      }
    });

    // Build the query - if queryObj is empty, find all
    let query = Opportunity.find(Object.keys(queryObj).length > 0 ? queryObj : {});

    // Handle sorting
    if (req.query.sort) {
      query = query.sort(req.query.sort as string);
    } else {
      query = query.sort('-createdAt');
    }

    // Execute query
    const opportunities = await query.exec();

    res.status(200).json({
      status: 'success',
      results: opportunities.length,
      data: { opportunities }
    });
  } catch (error) {
    console.error('Error in getAllOpportunities:', error);
    throw error;
  }
});

export const getOpportunity = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const opportunity = await Opportunity.findById(req.params.id);

  if (!opportunity) {
    return next(new AppError('No opportunity found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { opportunity }
  });
});

export const createOpportunity = catchAsync(async (req: Request, res: Response) => {
  const newOpportunity = await Opportunity.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { opportunity: newOpportunity }
  });
});

export const updateOpportunity = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const opportunity = await Opportunity.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!opportunity) {
    return next(new AppError('No opportunity found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { opportunity }
  });
});

export const deleteOpportunity = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const opportunity = await Opportunity.findByIdAndDelete(req.params.id);

  if (!opportunity) {
    return next(new AppError('No opportunity found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});