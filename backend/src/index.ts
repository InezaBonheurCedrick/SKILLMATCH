import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); 

import { app } from './app';
import { connectDB } from './config/db';

process.on('uncaughtException', (err: Error) => {
  console.log('UNCAUGHT EXCEPTION!  Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

connectDB();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION!  Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});