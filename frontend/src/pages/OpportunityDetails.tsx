import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Briefcase, ArrowLeft, 
  Globe, GraduationCap, FileText, CheckCircle2, 
  Calendar, MessageCircle, FileUp, Building2, 
  Share2, ShieldCheck, Banknote, Clock, AlertCircle, Loader2
} from 'lucide-react';
import { opportunitiesAPI } from '../services/api';
import ApplicationModal from '../components/ApplicationModal';

interface BackendOpportunity {
  _id: string;
  title: string;
  company: string;
  location: string;
  oppType: 'Job' | 'Internship' | 'Scholarship' | 'Tender' | 'Consultancy';
  workType: 'Full Time' | 'Part Time' | 'Contract' | 'Remote' | 'Hybrid';
  industry: string;
  salary: string;
  deadline: string;
  status: 'Active' | 'Draft' | 'Closed' | 'Archived';
  isFeatured: boolean;
  tags: string[];
  logo?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  aboutCompany?: string;
  createdAt: string;
}

const OpportunityDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isCopied, setIsCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [opportunity, setOpportunity] = useState<BackendOpportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchOpportunity();
    }
  }, [id]);

  const fetchOpportunity = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await opportunitiesAPI.getById(id!);
      setOpportunity(response.data.data.opportunity);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error fetching opportunity:', err);
      setError(err.response?.data?.message || 'Failed to load opportunity');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-sm font-medium text-slate-500">Loading opportunity details...</p>
        </div>
      </div>
    );
  }

  if (error || !opportunity) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Opportunity Not Found</h2>
            <p className="text-slate-500 mb-6">
              {error || 'The opportunity you are looking for might have been removed or is temporarily unavailable.'}
            </p>
            <Link to="/opportunities" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors w-full">
            <ArrowLeft size={18} className="mr-2" /> Back to Listings
            </Link>
        </div>
      </div>
    );
  }

  const isExpired = new Date(opportunity.deadline) < new Date() || opportunity.status === 'Closed';

  const phoneNumber = "250783487168";
  const whatsappMessage = encodeURIComponent(
    `Hello, I am interested in the ${opportunity.title} position at ${opportunity.company}.`
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'Scholarship': return <GraduationCap size={18} className="text-purple-600" />;
      case 'Tender': return <FileText size={18} className="text-orange-600" />;
      case 'Internship': return <Globe size={18} className="text-blue-600" />;
      default: return <Briefcase size={18} className="text-teal-600" />;
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20 font-sans">
      
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            <Link to="/opportunities" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm font-semibold transition-colors">
                <ArrowLeft size={16} /> <span className="hidden sm:inline">Back to Opportunities</span>
            </Link>
            <div className="flex items-center gap-3">
                <button 
                    onClick={handleShare}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                    <Share2 size={14} />
                    {isCopied ? 'Link Copied!' : 'Share'}
                </button>
            </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between gap-6">
                
                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                             isExpired 
                             ? 'bg-red-50 text-red-600 border-red-100' 
                             : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        }`}>
                            {isExpired ? 'Expired' : 'Active'}
                        </span>
                        <span className="text-slate-400 text-xs flex items-center gap-1 font-medium">
                            <Clock size={12} /> Posted {new Date(opportunity.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-slate-400 text-xs flex items-center gap-1 font-medium">
                             • {opportunity.oppType}
                        </span>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 tracking-tight leading-tight">
                        {opportunity.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-slate-500 font-medium">
                        <div className="flex items-center gap-1.5 text-slate-800">
                            <Building2 size={16} className="text-[#2b6cb0]" />
                            {opportunity.company}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin size={16} className="text-slate-400" />
                            {opportunity.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Banknote size={16} className="text-slate-400" />
                            {opportunity.salary}
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex flex-col justify-center min-w-[180px]">
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        disabled={isExpired}
                        className={`w-full py-2.5 px-4 rounded-lg font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                            isExpired 
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                            : 'bg-[#2b6cb0] text-white hover:bg-blue-700 hover:-translate-y-0.5'
                        }`}
                    >
                        <FileUp size={16} />
                        {isExpired ? 'Closed' : 'Submit Resume'}
                    </button>
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-6">
             <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#2b6cb0]" />
                About the Role
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {opportunity.description || "No specific description provided."}
              </p>
            </section>

            <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2b6cb0]" />
                Key Responsibilities
              </h3>
              <ul className="space-y-3">
                {opportunity.responsibilities && opportunity.responsibilities.length > 0 ? (
                  opportunity.responsibilities.map((item, index) => (
                    <li key={index} className="flex gap-3 text-sm text-slate-600 leading-relaxed group">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 group-hover:bg-blue-600 transition-colors"></div>
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-slate-400 italic text-sm">Detailed responsibilities not listed.</p>
                )}
              </ul>
            </section>

             <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2b6cb0]" />
                Requirements & Qualifications
              </h3>
              <ul className="space-y-3">
                {opportunity.requirements && opportunity.requirements.length > 0 ? (
                  opportunity.requirements.map((item, index) => (
                    <li key={index} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                      <div className="mt-1 min-w-[20px]">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-slate-400 italic text-sm">Requirements not listed.</p>
                )}
              </ul>
            </section>

            {opportunity.benefits && opportunity.benefits.length > 0 && (
                <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-[#2b6cb0]" />
                    Perks & Benefits
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                    {opportunity.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-sm text-slate-700 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                            {benefit}
                        </div>
                    ))}
                </div>
                </section>
            )}

            <section className="bg-[#1a202c] p-6 rounded-xl shadow-lg text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                <h3 className="text-base font-bold mb-3 flex items-center gap-2 relative z-10">
                    <Building2 className="w-4 h-4 text-blue-400" />
                    About {opportunity.company}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed relative z-10">
                    {opportunity.aboutCompany || `More information about ${opportunity.company} will be provided during the interview process.`}
                </p>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-5 h-fit">
            
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-5 text-xs uppercase tracking-wider border-b border-gray-100 pb-3">Overview</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isExpired ? 'bg-red-50' : 'bg-gray-100'}`}>
                    <Calendar size={18} className={isExpired ? 'text-blue-6 00' : 'text-blue-600'} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Deadline</p>
                    <p className={`text-sm font-bold ${isExpired ? 'text-red-600' : 'text-slate-800'}`}>
                        {new Date(opportunity.deadline).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                    {getIcon(opportunity.oppType)}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Type</p>
                    <p className="text-sm font-bold text-slate-800">{opportunity.oppType}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                    <Globe size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Arrangement</p>
                    <p className="text-sm font-bold text-slate-800">{opportunity.workType}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button 
                    onClick={() => setIsModalOpen(true)}
                    disabled={isExpired}
                    className={`w-full py-2.5 px-4 rounded-lg font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isExpired 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-[#2b6cb0] text-white hover:bg-blue-700 hover:shadow'
                    }`}
                >
                    <FileUp size={16} />
                    {isExpired ? 'Applications Closed' : 'Submit Resume'}
                </button>
                
                <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg font-bold text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
                >
                    <MessageCircle size={16} />
                    Contact via WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      <ApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        jobTitle={opportunity.title}
        companyName={opportunity.company}
        opportunityId={opportunity._id}
      />
    </div>
  );
};

export default OpportunityDetails;