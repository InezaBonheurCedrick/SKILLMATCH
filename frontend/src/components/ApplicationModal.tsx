import React, { useState } from 'react';
import { X, UploadCloud, CheckCircle2, Loader2, Send } from 'lucide-react';
import { applicationsAPI } from '../services/api';
import { uploadToCloudinary } from '../utils/cloudinary';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  companyName: string;
  opportunityId: string;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose, jobTitle, companyName, opportunityId }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: ''
  });

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      alert('Please upload your resume');
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File size must be less than 5MB');
      return;
    }

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF or DOC/DOCX file');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const resumeUrl = await uploadToCloudinary(file);
      
      const applicationData = {
        opportunityId,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        resumeUrl: resumeUrl,
        coverLetter: formData.coverLetter || '',
      };

      await applicationsAPI.create(applicationData);
      setStep('success');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error submitting application:', err);
      alert(err.message || err.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {step === 'form' ? 'Submit Application' : 'Application Sent'}
            </h2>
            <p className="text-xs font-medium text-slate-500">
              {step === 'form' ? `Applying for ${jobTitle} at ${companyName}` : 'Good luck!'}
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 hover:bg-slate-50 p-2 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Full Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Jean Pierre"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Email Address</label>
                  <input 
                    required
                    type="email" 
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="+250 78..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Resume / CV</label>
              <div className={`relative border-2 border-dashed rounded-xl p-6 transition-all text-center ${file ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'}`}>
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                  {file ? (
                    <>
                      <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                        <CheckCircle2 size={20} />
                      </div>
                      <p className="text-sm font-bold text-emerald-700">{file.name}</p>
                      <p className="text-xs text-emerald-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-1">
                        <UploadCloud size={20} />
                      </div>
                      <p className="text-sm font-bold text-slate-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-slate-400">PDF, DOCX (Max 5MB)</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={!file || isSubmitting}
              className="w-full py-3 bg-[#2b6cb0] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-900/20 hover:bg-blue-700 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Application
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="p-10 flex flex-col items-center text-center animate-in slide-in-from-bottom-5 duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">Application Received!</h3>
            <p className="text-slate-500 text-sm max-w-xs mb-8">
              Your details and resume have been sent to <strong>{companyName}</strong>. We will contact you at {formData.email} if you are shortlisted.
            </p>
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all w-full"
            >
              Back to Opportunity
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationModal;