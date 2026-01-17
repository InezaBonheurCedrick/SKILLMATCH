import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';
import { AuthRequest } from '../middleware/authMiddleware';

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, { 
    expiresIn: (process.env.JWT_EXPIRES_IN || '90d') as any 
  });
};

export const signup = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
  });

  (newUser as any).password = undefined;

  const token = signToken(newUser._id.toString());

  res.status(201).json({
    status: 'success',
    token,
    data: { user: newUser }
  });
});

export const signin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = signToken(user._id.toString());

  res.status(200).json({
    status: 'success',
    token,
  });
});

export const changePassword = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const user = await User.findById(req.user.id).select('+password');

  if (!user) {
    return next(new AppError('User no longer exists.', 404));
  }

  if (!(await user.correctPassword(req.body.oldPassword, user.password))) {
    return next(new AppError('Your current password is wrong', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  const token = signToken(user._id.toString());

  res.status(200).json({
    status: 'success',
    token,
    message: 'Password changed successfully!'
  });
});

export const logout = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully. Please clear your token.',
  });
};