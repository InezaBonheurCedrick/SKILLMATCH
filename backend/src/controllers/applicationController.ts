import { Request, Response, NextFunction } from 'express';
import { Application } from '../models/Application';
import { Opportunity } from '../models/Opportunity'; 
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';

export const submitApplication = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const job = await Opportunity.findById(req.body.opportunityId);
  if (!job) {
    return next(new AppError('The job you are applying for does not exist.', 404));
  }

  const newApplication = await Application.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Application submitted successfully!',
    data: { application: newApplication }
  });
});

export const getAllApplications = catchAsync(async (req: Request, res: Response) => {
  const filter: any = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.opportunityId) filter.opportunityId = req.query.opportunityId;

  const applications = await Application.find(filter)
    .populate('opportunityId', 'title company')
    .sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: applications.length,
    data: { applications }
  });
});

export const updateApplicationStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { status, adminNotes } = req.body;

  const application = await Application.findByIdAndUpdate(
    req.params.id,
    { status, adminNotes },
    { new: true, runValidators: true }
  );

  if (!application) {
    return next(new AppError('No application found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { application }
  });
});