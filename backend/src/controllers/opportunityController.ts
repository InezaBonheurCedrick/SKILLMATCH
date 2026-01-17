import { Request, Response, NextFunction } from 'express';
import { Opportunity } from '../models/Opportunity';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';

export const getAllOpportunities = catchAsync(async (req: Request, res: Response) => {
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(el => delete queryObj[el]);

  let query = Opportunity.find(queryObj);

  if (req.query.sort) {
    query = query.sort(req.query.sort as string);
  } else {
    query = query.sort('-createdAt');
  }

  const opportunities = await query;

  res.status(200).json({
    status: 'success',
    results: opportunities.length,
    data: { opportunities }
  });
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