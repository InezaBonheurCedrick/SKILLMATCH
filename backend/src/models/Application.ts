import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  opportunityId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Opportunity', 
    required: true 
  },
  fullName: { type: String, required: [true, 'Full name is required'] },
  email: { type: String, required: [true, 'Email is required'], lowercase: true },
  phone: { type: String, required: [true, 'Phone number is required'] },
  resumeUrl: { type: String, required: [true, 'Resume link is required'] }, 
  coverLetter: { type: String },
  
  status: {
    type: String,
    enum: ['New', 'Reviewed', 'Shortlisted', 'Rejected', 'Contacted'],
    default: 'New'
  },
  adminNotes: { type: String }
}, { timestamps: true });

export const Application = mongoose.model('Application', applicationSchema);