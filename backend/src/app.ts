import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import { AppError } from './utils/AppError';
import { globalErrorHandler } from './middleware/errorMiddleware';

import authRoutes from './routes/authRoutes';
import opportunityRoutes from './routes/opportunityRoutes';
import applicationRoutes from './routes/applicationRoutes';
import dashboardRoutes from './routes/dashboardRoutes';   

const app = express();

app.use(helmet());

// CORS configuration - allow requests from frontend
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*', // Allow all origins in development, set FRONTEND_URL in production
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'skillmatch-backend'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/applications', applicationRoutes); 
app.use('/api/dashboard', dashboardRoutes);   

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export { app };