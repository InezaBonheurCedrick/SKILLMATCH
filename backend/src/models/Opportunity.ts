import mongoose from 'mongoose';

const opportunitySchema = new mongoose.Schema({
  title: { type: String, required: [true, 'A job title is required'] },
  company: { type: String, required: [true, 'Company name is required'] },
  location: { type: String, required: true },
  oppType: { 
    type: String, 
    enum: ['Job', 'Internship', 'Scholarship', 'Tender', 'Consultancy'], 
    required: true 
  },
  workType: { 
    type: String, 
    enum: ['Full Time', 'Part Time', 'Contract', 'Remote', 'Hybrid'], 
    required: true 
  },
  industry: { type: String, required: true },
  status: {
    type: String,
    enum: ['Active', 'Draft', 'Closed', 'Archived'],
    default: 'Active'
  },
  salary: { type: String, default: 'Competitive' },
  deadline: { type: Date, required: true },
  isFeatured: { type: Boolean, default: false },
  tags: [String],
  logo: String,
  description: { type: String, required: true },
  responsibilities: [String],
  requirements: [String],
  benefits: [String],
  aboutCompany: String,
}, { timestamps: true });

export const Opportunity = mongoose.model('Opportunity', opportunitySchema);