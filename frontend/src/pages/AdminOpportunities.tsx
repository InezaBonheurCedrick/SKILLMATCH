import React, { useState, useMemo, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import OpportunityModal from '../components/OpportunityModal';
import { 
  Search, Filter, Plus, MoreHorizontal, 
  Edit3, Trash2, Eye, ChevronLeft, ChevronRight,
  Briefcase, Calendar, MapPin, ArrowUpDown,
  Loader2, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { opportunitiesAPI } from '../services/api';

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
  updatedAt: string;
}

const AdminOpportunities = () => {
  const [opportunities, setOpportunities] = useState<BackendOpportunity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'Active' | 'Expired'>('Active');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<BackendOpportunity | null>(null);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await opportunitiesAPI.getAll();
      setOpportunities(response.data.data.opportunities);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error fetching opportunities:', err);
      setError(err.response?.data?.message || 'Failed to load opportunities');
    } finally {
      setLoading(false);
    }
  };

  // Helper to check if opportunity is expired
  const isExpired = (deadline: string, status: string) => {
    if (status === 'Closed' || status === 'Archived') return true;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return deadlineDate < today;
  };

  const filteredData = useMemo(() => {
    return opportunities.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === 'All' || item.oppType === filterType;

      const itemExpired = isExpired(item.deadline, item.status);
      const matchesTab = activeTab === 'Active' ? !itemExpired : itemExpired;

      return matchesSearch && matchesType && matchesTab;
    });
  }, [opportunities, searchTerm, filterType, activeTab]);

  // --- Handlers ---
  
  const handleCreate = () => {
    setEditingOpportunity(null);
    setIsModalOpen(true);
  };

  const handleEdit = (opportunity: BackendOpportunity) => {
    setEditingOpportunity(opportunity);
    setIsModalOpen(true);
    setActiveMenu(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = async (formData: any) => {
    try {
      const deadlineDate = formData.deadline ? new Date(formData.deadline) : new Date();
      
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { posted, ...backendData } = formData;
      const payload = {
        ...backendData,
        deadline: deadlineDate.toISOString(),
        status: formData.status || 'Active',
      };

      if (editingOpportunity) {
        await opportunitiesAPI.update(editingOpportunity._id, payload);
        await fetchOpportunities(); 
      } else {
        await opportunitiesAPI.create(payload);
        await fetchOpportunities();
      }
      setIsModalOpen(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error saving opportunity:', err);
      alert(err.response?.data?.message || 'Failed to save opportunity');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this opportunity?")) {
      try {
        await opportunitiesAPI.delete(id);
        await fetchOpportunities(); 
        setActiveMenu(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error('Error deleting opportunity:', err);
        alert(err.response?.data?.message || 'Failed to delete opportunity');
      }
    }
  };

  const handleClose = async (id: string) => {
    if (window.confirm("Are you sure you want to close this opportunity? It will no longer accept applications.")) {
      try {
        await opportunitiesAPI.update(id, { status: 'Closed' });
        await fetchOpportunities();
        setActiveMenu(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error('Error closing opportunity:', err);
        alert(err.response?.data?.message || 'Failed to close opportunity');
      }
    }
  };

  const getActiveCount = () => {
    return opportunities.filter(item => !isExpired(item.deadline, item.status)).length;
  };

  const getExpiredCount = () => {
    return opportunities.filter(item => isExpired(item.deadline, item.status)).length;
  };

  const getStatusColor = (status: string, deadline: string) => {
    if (status === 'Draft') return 'bg-slate-100 text-slate-600 border-slate-200';
    if (status === 'Closed' || status === 'Archived') return 'bg-rose-50 text-rose-700 border-rose-100';
    
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return deadlineDate > today 
      ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
      : 'bg-slate-100 text-slate-500 border-slate-200';
  };

  const getStatusText = (status: string, deadline: string) => {
    if (status === 'Draft') return 'Draft';
    if (status === 'Closed') return 'Closed';
    if (status === 'Archived') return 'Archived';
    
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return deadlineDate > today ? 'Active' : 'Closed';
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getLogoInitials = (company: string, logo?: string) => {
    if (logo) return logo;
    return company
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="flex bg-slate-50/50 min-h-screen font-sans text-slate-900">
        <AdminSidebar />
        <main className="flex-1 px-8 py-8 h-screen overflow-y-auto scroll-smooth flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-slate-600" />
            <p className="text-sm font-medium text-slate-500">Loading opportunities...</p>
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
            <p className="text-red-800 font-bold mb-2">Error loading opportunities</p>
            <p className="text-red-600 text-sm mb-4">{error}</p>
            <button
              onClick={fetchOpportunities}
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
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Opportunity Management</h1>
            <p className="text-xs font-medium text-slate-500 mt-1">View, edit, and manage all posted opportunities.</p>
          </div>
          <div className="flex items-center gap-3">
            
            <button 
              onClick={handleCreate}
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-lg font-bold text-xs hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 cursor-pointer"
            >
              <Plus size={16} />
              Add New Opportunity
            </button>
          </div>
        </div>

        {/* --- Tabs --- */}
        <div className="flex items-center gap-6 border-b border-slate-200 mb-6 bg-white rounded-t-xl px-4 pt-4">
          <button 
            onClick={() => setActiveTab('Active')}
            className={`pb-3 text-xs font-bold flex items-center gap-2 transition-all relative ${
              activeTab === 'Active' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Active Opportunities
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${
              activeTab === 'Active' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
            }`}>
              {getActiveCount()}
            </span>
            {activeTab === 'Active' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></div>}
          </button>
          
          <button 
            onClick={() => setActiveTab('Expired')}
            className={`pb-3 text-xs font-bold flex items-center gap-2 transition-all relative ${
              activeTab === 'Expired' ? 'text-red-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Expired / Closed
            <span className={`px-2 py-0.5 rounded-full text-[10px] ${
              activeTab === 'Expired' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'
            }`}>
              {getExpiredCount()}
            </span>
            {activeTab === 'Expired' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 rounded-t-full"></div>}
          </button>
        </div>

        {/* --- Toolbar & Filters --- */}
        <div className="bg-white rounded-t-xl border border-slate-200 border-b-0 p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
            <input 
              type="text" 
              placeholder="Search by title or company..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all" 
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative">
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 focus:outline-none cursor-pointer hover:bg-slate-50"
              >
                <option value="All">All Types</option>
                <option value="Job">Jobs</option>
                <option value="Internship">Internships</option>
                <option value="Scholarship">Scholarships</option>
                <option value="Tender">Tenders</option>
              </select>
              <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 w-3 h-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* --- Data Table --- */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-b-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider w-12 text-center">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-0" />
                  </th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700">
                      Opportunity
                      <ArrowUpDown size={10} />
                    </div>
                  </th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Location</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Deadline</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item._id} className="group hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3 text-center">
                        <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer" />
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500 shrink-0 uppercase">
                            {getLogoInitials(item.company, item.logo)}
                          </div>
                          <div>
                            <Link to={`/opportunities/${item._id}`} className="text-xs font-bold text-slate-800 hover:text-blue-600 transition-colors block mb-0.5">
                              {item.title}
                            </Link>
                            <p className="text-[11px] font-medium text-slate-500">{item.company}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5">
                          <Briefcase size={12} className="text-slate-400" />
                          <span className="text-[11px] font-medium text-slate-600">{item.oppType}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-slate-400" />
                          <span className="text-[11px] font-medium text-slate-600 truncate max-w-[120px]">{item.location}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(item.status, item.deadline)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            getStatusText(item.status, item.deadline) === 'Active' ? 'bg-emerald-500' : 
                            getStatusText(item.status, item.deadline) === 'Draft' ? 'bg-slate-400' : 'bg-rose-500'
                          }`}></span>
                          {getStatusText(item.status, item.deadline)}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-slate-400" />
                          <span className="text-[11px] font-medium text-slate-600">{formatDate(item.deadline)}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-right relative">
                        <button 
                          onClick={() => setActiveMenu(activeMenu === item._id ? null : item._id)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                        >
                          <MoreHorizontal size={16} />
                        </button>

                        {activeMenu === item._id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)}></div>
                            <div className="absolute right-8 top-6 w-36 bg-white border border-slate-100 rounded-lg shadow-xl shadow-slate-200/50 z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                              <div className="p-1">
                                  <Link to={`/opportunities/${item._id}`} className="w-full px-3 py-2 text-left text-[11px] font-bold text-slate-700 hover:bg-slate-50 rounded-md flex items-center gap-2">
                                    <Eye size={12} className="text-slate-400" /> View Details
                                  </Link>
                                  
                                  <button 
                                    onClick={() => handleEdit(item)}
                                    className="w-full px-3 py-2 text-left text-[11px] font-bold text-slate-700 hover:bg-slate-50 rounded-md flex items-center gap-2"
                                  >
                                    <Edit3 size={12} className="text-slate-400" /> Edit Info
                                  </button>

                                  {activeTab === 'Active' && (
                                    <button 
                                      onClick={() => handleClose(item._id)}
                                      className="w-full px-3 py-2 text-left text-[11px] font-bold text-amber-600 hover:bg-amber-50 rounded-md flex items-center gap-2"
                                    >
                                      <Clock size={12} /> Close Opportunity
                                    </button>
                                  )}

                                  <div className="h-px bg-slate-100 my-1"></div>
                                  <button 
                                    onClick={() => handleDelete(item._id)}
                                    className="w-full px-3 py-2 text-left text-[11px] font-bold text-rose-600 hover:bg-rose-50 rounded-md flex items-center gap-2"
                                  >
                                    <Trash2 size={12} /> Delete
                                  </button>
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
                        <Briefcase size={24} className="text-slate-200" />
                        <p className="text-sm font-medium text-slate-500">No opportunities found.</p>
                        <p className="text-xs">Try adjusting your filters or search terms.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* --- Pagination Footer --- */}
          <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <p className="text-[11px] text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-700">{filteredData.length}</span> results
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

        <OpportunityModal 
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingOpportunity(null);
          }}
          onSave={handleSave}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          initialData={editingOpportunity as any}
        />
        
      </main>
    </div>
  );
};

export default AdminOpportunities;