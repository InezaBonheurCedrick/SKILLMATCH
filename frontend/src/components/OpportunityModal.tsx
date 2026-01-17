import React, { useState, useEffect } from 'react';
import { X, Save, MapPin, Calendar, DollarSign, Building2, AlignLeft } from 'lucide-react';
import { type Opportunity } from '../types/opportunities';

interface OpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Opportunity>) => void;
  initialData?: Opportunity | null;
}

const OpportunityModal: React.FC<OpportunityModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<Partial<Opportunity>>({
    title: '',
    company: '',
    logo: '',
    location: '',
    oppType: 'Job',
    workType: 'Full Time',
    industry: '',
    salary: '',
    deadline: '',
    description: '',
    aboutCompany: '',
    responsibilities: [],
    requirements: [],
    benefits: [],
    tags: [],
    isFeatured: false,
    posted: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backendData = initialData as any;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        title: backendData.title || '',
        company: backendData.company || '',
        logo: backendData.logo || '',
        location: backendData.location || '',
        oppType: backendData.oppType || 'Job',
        workType: backendData.workType || 'Full Time',
        industry: backendData.industry || '',
        salary: backendData.salary || '',
        deadline: backendData.deadline ? new Date(backendData.deadline).toISOString().split('T')[0] : '',
        description: backendData.description || '',
        aboutCompany: backendData.aboutCompany || '',
        responsibilities: backendData.responsibilities || [],
        requirements: backendData.requirements || [],
        benefits: backendData.benefits || [],
        tags: backendData.tags || [],
        isFeatured: backendData.isFeatured || false,
        posted: backendData.createdAt ? new Date(backendData.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      });
    } else {
      setFormData({
        title: '',
        company: '',
        logo: '',
        location: '',
        oppType: 'Job',
        workType: 'Full Time',
        industry: '',
        salary: '',
        deadline: '',
        description: '',
        aboutCompany: '',
        tags: [],
        responsibilities: [],
        requirements: [],
        benefits: [],
        isFeatured: false,
        posted: new Date().toISOString().split('T')[0]
      });
    }
  }, [initialData, isOpen]);

  const handleArrayInput = (field: keyof Opportunity, value: string) => {
    const arrayValue = value.split('\n');
    setFormData(prev => ({ ...prev, [field]: arrayValue }));
  };

  const getArrayString = (field: keyof Opportunity) => {
    const val = formData[field];
    if (Array.isArray(val)) {
      return val.join('\n');
    }
    return '';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-white h-screen shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {initialData ? 'Edit Opportunity' : 'Create New Opportunity'}
            </h2>
            <p className="text-[11px] font-medium text-slate-500">Manage opportunity details and requirements.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Basic Information</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Opportunity Title</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  placeholder="e.g. Senior Software Engineer"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Company Name</label>
                <div className="relative">
                  <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none"
                    placeholder="Company name"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Industry / Sector</label>
                <select 
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none appearance-none cursor-pointer"
                  value={formData.industry}
                  onChange={(e) => setFormData({...formData, industry: e.target.value})}
                >
                  <option value="">Select Industry</option>
                  <option value="Management">Management</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Education">Education</option>
                  <option value="Procurement">Procurement</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Legal">Legal</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Tourism & Hospitality">Tourism & Hospitality</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail</option>
                  <option value="Non-Profit">Non-Profit</option>
                  <option value="Government">Government</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Logo Initials (Short)</label>
                <input 
                  type="text" 
                  maxLength={2}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none uppercase"
                  placeholder="e.g. TC"
                  value={formData.logo}
                  onChange={(e) => setFormData({...formData, logo: e.target.value})}
                />
              </div>
               <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <span className="text-xs font-bold text-slate-700">Mark as Featured Opportunity</span>
                </label>
              </div>
            </div>
             <div className="mt-4">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">About Company</label>
                <textarea 
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none resize-none"
                  placeholder="Brief description of the company..."
                  value={formData.aboutCompany}
                  onChange={(e) => setFormData({...formData, aboutCompany: e.target.value})}
                />
              </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-4 bg-emerald-500 rounded-full" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Logistics & Classification</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Type</label>
                <select 
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none appearance-none"
                  value={formData.oppType}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onChange={(e) => setFormData({...formData, oppType: e.target.value as any})}
                >
                  <option value="Job">Job Opportunity</option>
                  <option value="Internship">Internship</option>
                  <option value="Scholarship">Scholarship</option>
                  <option value="Tender">Public Tender</option>
                   <option value="Consultancy">Consultancy</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Work Arrangement</label>
                <select 
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none"
                  value={formData.workType}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onChange={(e) => setFormData({...formData, workType: e.target.value as any})}
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Salary / Budget</label>
                <div className="relative">
                  <DollarSign size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none"
                    placeholder="e.g. 2.5M RWF"
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Location</label>
                <div className="relative">
                  <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none"
                    placeholder="e.g. Kigali, Rwanda"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Application Deadline</label>
                <div className="relative">
                  <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="date" 
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none"
                    value={formData.deadline}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-4 bg-amber-500 rounded-full" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Description & Details</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                   <label className="block text-[11px] font-bold text-slate-700">Opportunity Description</label>
                   <AlignLeft size={12} className="text-slate-400" />
                </div>
                <textarea 
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none resize-none"
                  placeholder="Provide a detailed overview..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                   <label className="block text-[11px] font-bold text-slate-700">Key Responsibilities</label>
                   <AlignLeft size={12} className="text-slate-400" />
                </div>
                <textarea 
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none resize-none"
                  placeholder="- Manage team operations..."
                  value={getArrayString('responsibilities')}
                  onChange={(e) => handleArrayInput('responsibilities', e.target.value)}
                />
              </div>

               <div>
                <div className="flex items-center justify-between mb-1">
                   <label className="block text-[11px] font-bold text-slate-700">Requirements / Qualifications</label>
                   <AlignLeft size={12} className="text-slate-400" />
                </div>
                <textarea 
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none resize-none"
                  placeholder="- Bachelor's degree in..."
                  value={getArrayString('requirements')}
                  onChange={(e) => handleArrayInput('requirements', e.target.value)}
                />
              </div>

               <div>
                <div className="flex items-center justify-between mb-1">
                   <label className="block text-[11px] font-bold text-slate-700">Benefits & Perks</label>
                   <AlignLeft size={12} className="text-slate-400" />
                </div>
                <textarea 
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none resize-none"
                  placeholder="- Health Insurance..."
                  value={getArrayString('benefits')}
                  onChange={(e) => handleArrayInput('benefits', e.target.value)}
                />
              </div>

            </div>
          </section>
        </div>

        <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50">
          <button 
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              const cleanedData = {
                ...formData,
                responsibilities: Array.isArray(formData.responsibilities) 
                  ? formData.responsibilities.filter(item => item.trim() !== '') 
                  : formData.responsibilities,
                requirements: Array.isArray(formData.requirements) 
                  ? formData.requirements.filter(item => item.trim() !== '') 
                  : formData.requirements,
                benefits: Array.isArray(formData.benefits) 
                  ? formData.benefits.filter(item => item.trim() !== '') 
                  : formData.benefits,
              };
              onSave(cleanedData);
            }}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-lg font-bold text-xs hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
          >
            <Save size={14} />
            {initialData ? 'Update Changes' : 'Publish Opportunity'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityModal;