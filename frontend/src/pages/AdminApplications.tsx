import React, { useState, useMemo, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { 
  Search, Filter, Download, MoreHorizontal, 
  CheckCircle, Mail, FileText, ChevronLeft, 
  ChevronRight, User, Briefcase,
 Clock, ThumbsUp, ThumbsDown, Loader2, ExternalLink
} from 'lucide-react';
import { applicationsAPI } from '../services/api';

interface BackendApplication {
  _id: string;
  opportunityId: {
    _id: string;
    title: string;
    company: string;
  } | string;
  fullName: string;
  email: string;
  phone: string;
  resumeUrl: string;
  coverLetter?: string;
  status: 'New' | 'Reviewed' | 'Shortlisted' | 'Rejected' | 'Contacted';
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

const AdminApplications = () => {
  const [applications, setApplications] = useState<BackendApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'Unreviewed' | 'Reviewed'>('Unreviewed');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await applicationsAPI.getAll();
      setApplications(response.data.data.applications);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error fetching applications:', err);
      setError(err.response?.data?.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      const roleTitle = typeof app.opportunityId === 'object' ? app.opportunityId.title : 'Unknown';
      
      // 1. Search Filter
      const matchesSearch = 
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        roleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase());

      const isUnreviewed = app.status === 'New';
      const isReviewed = ['Reviewed', 'Shortlisted', 'Rejected', 'Contacted'].includes(app.status);

      const matchesTab = activeTab === 'Unreviewed' ? isUnreviewed : isReviewed;

      return matchesSearch && matchesTab;
    });
  }, [applications, searchTerm, activeTab]);

  const handleStatusChange = async (id: string, newStatus: BackendApplication['status']) => {
    try {
      await applicationsAPI.updateStatus(id, newStatus);
      await fetchApplications();
      setActiveMenu(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error updating application status:', err);
      alert(err.response?.data?.message || 'Failed to update application status');
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getAvatarInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleTitle = (app: BackendApplication) => {
    if (typeof app.opportunityId === 'object' && app.opportunityId.title) {
      return app.opportunityId.title;
    }
    return 'Unknown Role';
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'New': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Shortlisted': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Rejected': return 'bg-rose-50 text-rose-700 border-rose-100';
      case 'Reviewed': return 'bg-slate-100 text-slate-600 border-slate-200';
      case 'Contacted': return 'bg-amber-50 text-amber-700 border-amber-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const handleDownloadResume = async (resumeUrl: string, candidateName: string) => {
    try {
      const response = await fetch(resumeUrl);
      if (!response.ok) throw new Error('Failed to fetch resume');
      
      const blob = await response.blob();
      
      let fileExtension = '.pdf'; 
      if (blob.type) {
        if (blob.type.includes('pdf')) fileExtension = '.pdf';
        else if (blob.type.includes('msword') || blob.type.includes('wordprocessingml')) {
          fileExtension = blob.type.includes('wordprocessingml') ? '.docx' : '.doc';
        }
      } else {
        const urlLower = resumeUrl.toLowerCase();
        if (urlLower.includes('.docx')) fileExtension = '.docx';
        else if (urlLower.includes('.doc')) fileExtension = '.doc';
        else if (urlLower.includes('.pdf')) fileExtension = '.pdf';
      }
      
      const sanitizedName = candidateName.replace(/[^a-zA-Z0-9\s]/g, '').trim();
      const fileName = `${sanitizedName} Resume${fileExtension}`;
      
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume. Please try again or use the "View Resume" option.');
    }
  };

  // Helper to get count for tabs
  const getCount = (type: 'Unreviewed' | 'Reviewed') => {
    if (type === 'Unreviewed') return applications.filter(a => a.status === 'New').length;
    return applications.filter(a => ['Reviewed', 'Shortlisted', 'Rejected', 'Contacted'].includes(a.status)).length;
  };

  if (loading) {
    return (
      <div className="flex bg-slate-50/50 min-h-screen font-sans text-slate-900">
        <AdminSidebar />
        <main className="flex-1 px-8 py-8 h-screen overflow-y-auto scroll-smooth flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-slate-600" />
            <p className="text-sm font-medium text-slate-500">Loading applications...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex bg-slate-50/50 min-h-screen font-sans text-slate-900">
        <AdminSidebar />
        <main className="flex-1 px-8 py-8 h-screen overflow-y-auto scroll-smooth flex items-center justify-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <p className="text-red-800 font-bold mb-2">Error loading applications</p>
            <p className="text-red-600 text-sm mb-4">{error}</p>
            <button
              onClick={fetchApplications}
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-slate-50/50 min-h-screen font-sans text-slate-900">
      <AdminSidebar />

      <main className="flex-1 px-8 py-8 h-screen overflow-y-auto scroll-smooth relative">
        
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Application Management</h1>
            <p className="text-xs font-medium text-slate-500 mt-1">Review resumes, shortlist candidates, and manage hiring flow.</p>
          </div>
        </div>

        {/* --- Tabs --- */}
        <div className="flex items-center gap-6 border-b border-slate-200 mb-6">
          <button 
            onClick={() => setActiveTab('Unreviewed')}
            className={`pb-3 text-xs font-bold flex items-center gap-2 transition-all relative ${
              activeTab === 'Unreviewed' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Unreviewed Applications
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${
              activeTab === 'Unreviewed' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
            }`}>
              {getCount('Unreviewed')}
            </span>
            {activeTab === 'Unreviewed' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></div>}
          </button>
          
          <button 
            onClick={() => setActiveTab('Reviewed')}
            className={`pb-3 text-xs font-bold flex items-center gap-2 transition-all relative ${
              activeTab === 'Reviewed' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Reviewed / Past
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${
              activeTab === 'Reviewed' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
            }`}>
              {getCount('Reviewed')}
            </span>
            {activeTab === 'Reviewed' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></div>}
          </button>
        </div>

        {/* --- Toolbar --- */}
        <div className="bg-white rounded-t-xl border border-slate-200 border-b-0 p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
            <input 
              type="text" 
              placeholder="Search candidate, role..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all" 
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
             <div className="relative">
              <select className="appearance-none pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 focus:outline-none cursor-pointer hover:bg-slate-50">
                <option>All Roles</option>
                <option>Engineering</option>
                <option>Design</option>
                <option>Marketing</option>
              </select>
              <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-3 h-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* --- Table --- */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-b-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-12 text-center">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-0" />
                  </th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Candidate</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Applied Role</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Applied Date</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Phone Number</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.length > 0 ? (
                  filteredApps.map((app) => (
                    <tr key={app._id} className="group hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3 text-center">
                        <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer" />
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600 border border-blue-200">
                            {getAvatarInitials(app.fullName)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-800 truncate">{app.fullName}</p>
                            <p className="text-[10px] text-slate-500 truncate">{app.email}</p>
                          </div>
                          {app.resumeUrl && (
                            <a
                              href={app.resumeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-md text-blue-600 hover:bg-blue-50 transition-colors shrink-0"
                              title="View Resume Online"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5">
                          <Briefcase size={12} className="text-slate-400" />
                          <span className="text-[11px] font-medium text-slate-700">{getRoleTitle(app)}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} className="text-slate-400" />
                          <span className="text-[11px] font-medium text-slate-600">{formatDate(app.createdAt)}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-[11px] font-medium text-slate-600">{app.phone}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(app.status)}`}>
                          {app.status === 'New' && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>}
                          {app.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right relative">
                        <button 
                          onClick={() => setActiveMenu(activeMenu === app._id ? null : app._id)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                        >
                          <MoreHorizontal size={16} />
                        </button>

                        {/* Action Dropdown */}
                        {activeMenu === app._id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)}></div>
                            <div className="absolute right-8 top-6 w-40 bg-white border border-slate-100 rounded-lg shadow-xl shadow-slate-200/50 z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                              <div className="p-1">
                                <a 
                                  href={app.resumeUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="w-full px-3 py-2 text-left text-[11px] font-bold text-slate-700 hover:bg-slate-50 rounded-md flex items-center gap-2"
                                >
                                  <FileText size={12} className="text-slate-400" /> View Resume
                                </a>
                                <button 
                                  onClick={() => handleDownloadResume(app.resumeUrl, app.fullName)}
                                  className="w-full px-3 py-2 text-left text-[11px] font-bold text-slate-700 hover:bg-slate-50 rounded-md flex items-center gap-2"
                                >
                                  <Download size={12} className="text-slate-400" /> Download Resume
                                </button>
                                
                                <div className="h-px bg-slate-100 my-1"></div>

                                {app.status === 'New' && (
                                  <button 
                                    onClick={() => handleStatusChange(app._id, 'Reviewed')}
                                    className="w-full px-3 py-2 text-left text-[11px] font-bold text-blue-600 hover:bg-blue-50 rounded-md flex items-center gap-2"
                                  >
                                    <CheckCircle size={12} /> Mark Reviewed
                                  </button>
                                )}

                                <button 
                                  onClick={() => handleStatusChange(app._id, 'Shortlisted')}
                                  className="w-full px-3 py-2 text-left text-[11px] font-bold text-emerald-600 hover:bg-emerald-50 rounded-md flex items-center gap-2"
                                >
                                  <ThumbsUp size={12} /> Shortlist
                                </button>

                                <button 
                                  onClick={() => handleStatusChange(app._id, 'Rejected')}
                                  className="w-full px-3 py-2 text-left text-[11px] font-bold text-rose-600 hover:bg-rose-50 rounded-md flex items-center gap-2"
                                >
                                  <ThumbsDown size={12} /> Reject
                                </button>
                                
                                <a 
                                  href={`mailto:${app.email}`}
                                  className="w-full px-3 py-2 text-left text-[11px] font-bold text-slate-700 hover:bg-slate-50 rounded-md flex items-center gap-2"
                                >
                                  <Mail size={12} className="text-slate-400" /> Send Email
                                </a>
                              </div>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <User size={24} className="text-slate-200" />
                        <p className="text-sm font-medium text-slate-500">No applications found in this tab.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination */}
           <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <p className="text-[11px] text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-700">{filteredApps.length}</span> candidates
            </p>
            <div className="flex items-center gap-1">
              <button disabled className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-300 cursor-not-allowed">
                <ChevronLeft size={14} />
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 bg-slate-800 text-white text-xs font-bold shadow-sm">1</button>
              <button disabled className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-300 cursor-not-allowed">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminApplications;