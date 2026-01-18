import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Clock, ChevronLeft, ChevronRight, ChevronDown, Filter, TrendingUp, GraduationCap, FileText, Globe, CalendarX, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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
  createdAt: string;
}

const Opportunities: React.FC = () => {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<BackendOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  
  const [selectedOppTypes, setSelectedOppTypes] = useState<string[]>([]);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState<string[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  
  const [statusFilter, setStatusFilter] = useState<string>('Active');

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchOpportunities();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, locationSearch, selectedOppTypes, selectedWorkTypes, selectedIndustry, statusFilter]);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await opportunitiesAPI.getAll();
      const publicOpportunities = response.data.data.opportunities.filter(
        (opp: BackendOpportunity) => opp.status !== 'Draft' && opp.status !== 'Archived'
      );
      setOpportunities(publicOpportunities);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error fetching opportunities:', err);
      setError(err.response?.data?.message || 'Failed to load opportunities');
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = useMemo(() => {
    const today = new Date();

    return opportunities.filter(job => {
      const matchesKeyword = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = job.location.toLowerCase().includes(locationSearch.toLowerCase());
      const matchesOppType = selectedOppTypes.length === 0 || selectedOppTypes.includes(job.oppType);
      const matchesWorkType = selectedWorkTypes.length === 0 || selectedWorkTypes.includes(job.workType);
      const matchesIndustry = selectedIndustry === 'All' || job.industry === selectedIndustry;

      const jobDeadline = new Date(job.deadline);
      const isExpired = jobDeadline < today || job.status === 'Closed';
      
      let matchesStatus = true;
      if (statusFilter === 'Active') {
        matchesStatus = !isExpired && job.status === 'Active';
      } else if (statusFilter === 'Expired') {
        matchesStatus = isExpired || job.status === 'Closed';
      }

      return matchesKeyword && matchesLocation && matchesOppType && matchesWorkType && matchesIndustry && matchesStatus;
    });
  }, [opportunities, searchTerm, locationSearch, selectedOppTypes, selectedWorkTypes, selectedIndustry, statusFilter]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  const toggleOppType = (type: string) => {
    setSelectedOppTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleWorkType = (type: string) => {
    setSelectedWorkTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const clearAllFilters = () => {
    setSelectedOppTypes([]);
    setSelectedWorkTypes([]);
    setSelectedIndustry('All');
    setSearchTerm('');
    setLocationSearch('');
    setStatusFilter('Active'); 
  };

  const activeFiltersCount = selectedOppTypes.length + selectedWorkTypes.length + (selectedIndustry !== 'All' ? 1 : 0);

  const industries = ["All", "Management", "Information Technology", "Marketing", "Finance", "Customer Service", "Engineering", "Education", "Procurement", "Healthcare", "Legal", "Real Estate", "Agriculture", "Tourism & Hospitality", "Manufacturing", "Retail", "Non-Profit", "Government", "Other"];
  const oppCategories = ["Job", "Internship", "Scholarship", "Tender", "Consultancy"];

  const getOppIcon = (type: string) => {
    switch(type) {
      case 'Scholarship': return <GraduationCap className="w-3.5 h-3.5 text-teal-600" />;
      case 'Tender': return <FileText className="w-3.5 h-3.5 text-teal-600" />;
      case 'Internship': return <Globe className="w-3.5 h-3.5 text-teal-600" />;
      default: return <Briefcase className="w-3.5 h-3.5 text-teal-600" />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      {/* --- HERO HEADER --- */}
      <div className="relative h-[350px] md:h-[400px] flex items-center mb-10">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dtcf04lfg/image/upload/v1768660701/photo-1497215728101-856f4ea42174_rvvdjf.avif" 
            alt="Office Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/70"></div>
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center  gap-2 bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium mb-4 border border-white/20">
              <TrendingUp className="w-3 h-3" />
              <span>{opportunities.length}+ Total Opportunities</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              Find Your Next <span className="text-teal-400">Big Opportunity</span>
            </h1>
            
            <p className="text-slate-200 text-sm md:text-base mb-8 max-w-2xl leading-relaxed">
              Browse jobs, internships, scholarships, and tenders from top organizations in Rwanda.
            </p>

            <div className="bg-white p-2 rounded-lg shadow-xl max-w-4xl">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-grow md:w-1/2 flex items-center px-3 py-2 bg-gray-50 rounded-md border border-gray-200 focus-within:border-blue-500 focus-within:bg-white transition-all">
                  <Search className="w-4 h-4 text-slate-400 mr-2" />
                  <input 
                    type="text" 
                    placeholder="Search opportunities..." 
                    className="w-full bg-transparent outline-none text-slate-700 placeholder-slate-400 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex-grow md:w-1/4 flex items-center px-3 py-2 bg-gray-50 rounded-md border border-gray-200 focus-within:border-blue-500 focus-within:bg-white transition-all">
                  <MapPin className="w-4 h-4 text-slate-400 mr-2" />
                  <input 
                    type="text" 
                    placeholder="Location" 
                    className="w-full bg-transparent outline-none text-slate-700 placeholder-slate-400 text-sm"
                    value={locationSearch}
                    onChange={(e) => setLocationSearch(e.target.value)}
                  />
                </div>

                <button className="bg-[#2b6cb0] text-white px-6 py-2 rounded-md font-bold hover:bg-blue-700 transition-all text-sm whitespace-nowrap">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8 relative z-20">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 p-3 rounded-lg text-slate-700 font-semibold shadow-sm text-sm"
          >
            <Filter className="w-4 h-4" />
            <span>{showMobileFilters ? 'Hide Filters' : 'Filter Opportunities'}</span>
            {activeFiltersCount > 0 && (
              <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* --- SIDEBAR FILTERS --- */}
          <aside className={`lg:w-64 shrink-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-4 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                  <Filter className="w-3 h-3 text-slate-500" />
                  Filters
                </h3>
                {activeFiltersCount > 0 && (
                  <button 
                    onClick={clearAllFilters}
                    className="text-xs text-blue-600 font-medium hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="p-4 space-y-6 max-h-[calc(100vh-150px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                
                {/* Category Filter */}
                <div>
                  <h4 className="font-bold text-slate-700 mb-2 text-xs uppercase tracking-wider">Category</h4>
                  <div className="space-y-1">
                    {oppCategories.map((type) => (
                      <label key={type} className="flex items-center cursor-pointer hover:bg-gray-50 p-1.5 -mx-1.5 rounded-md transition-colors">
                        <input 
                          type="checkbox" 
                          checked={selectedOppTypes.includes(type)}
                          onChange={() => toggleOppType(type)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-slate-600">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Industry Filter */}
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-bold text-slate-700 mb-2 text-xs uppercase tracking-wider">Industry / Sector</h4>
                  <div className="relative">
                    <select 
                      value={selectedIndustry}
                      onChange={(e) => setSelectedIndustry(e.target.value)}
                      className="w-full py-2 pl-3 pr-8 bg-slate-50 border border-gray-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                    >
                      {industries.map(ind => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                    <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none rotate-90" />
                  </div>
                </div>

                {/* Work Arrangement Filter */}
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-bold text-slate-700 mb-2 text-xs uppercase tracking-wider">Work Type</h4>
                  <div className="space-y-1">
                    {['Full Time', 'Part Time', 'Contract', 'Remote', 'Hybrid'].map((type) => (
                      <label key={type} className="flex items-center cursor-pointer hover:bg-gray-50 p-1.5 -mx-1.5 rounded-md transition-colors">
                        <input 
                          type="checkbox" 
                          checked={selectedWorkTypes.includes(type)}
                          onChange={() => toggleWorkType(type)}
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-slate-600">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 px-2 gap-4 sm:gap-0">
              <h2 className="text-slate-700 font-bold text-lg tracking-tight">
                {filteredJobs.length} <span className="text-slate-500 font-medium text-sm ml-1">{statusFilter} Results Found</span>
                {totalPages > 1 && (
                  <span className="text-slate-400 font-normal text-xs ml-2">
                    (Page {currentPage} of {totalPages})
                  </span>
                )}
              </h2>
              
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-medium">Status:</span>
                <div className="relative group">
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={`appearance-none pl-4 pr-9 py-1.5 rounded-full border text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer shadow-sm ${
                      statusFilter === 'Active' 
                        ? 'bg-teal-50 border-teal-200 text-teal-700' 
                        : 'bg-red-50 border-red-200 text-red-700'
                    }`}
                  >
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                  </select>
                  <ChevronDown className={`w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                     statusFilter === 'Active' ? 'text-teal-500' : 'text-red-500'
                  }`} />
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-gray-200">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
                <p className="text-sm font-medium text-slate-500">Loading opportunities...</p>
              </div>
            ) : error ? (
              <div className="text-center py-16 bg-white rounded-xl border border-red-200">
                <p className="text-red-600 font-bold mb-2">Error loading opportunities</p>
                <p className="text-sm text-red-500 mb-4">{error}</p>
                <button
                  onClick={fetchOpportunities}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : (
              /* Opportunity Cards */
              <div className="space-y-4">
                {paginatedJobs.length > 0 ? (
                  paginatedJobs.map((job) => (
                    <div
                      key={job._id}
                      onClick={() => navigate(`/opportunities/${job._id}`)}
                      className={`group relative bg-white rounded-xl p-5 border transition-all duration-200 hover:shadow-lg cursor-pointer ${
                        statusFilter === 'Expired'
                          ? 'border-red-100 bg-red-50/10 opacity-75 grayscale-[0.5]'
                          : job.isFeatured 
                            ? 'border-teal-500/30 bg-teal-50/10' 
                            : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                    <div className="flex gap-5">

                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                                job.oppType === 'Job' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                job.oppType === 'Scholarship' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                job.oppType === 'Tender' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                'bg-teal-50 text-teal-600 border-teal-100'
                              }`}>
                                {job.oppType}
                              </span>
                              {statusFilter === 'Expired' && (
                                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border bg-red-100 text-red-600 border-red-200 flex items-center gap-1">
                                  <CalendarX className="w-3 h-3"/> Expired
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#2b6cb0] transition-colors leading-tight">
                              {job.title}
                            </h3>
                            <p className="text-sm text-slate-600 font-medium mt-0.5">{job.company}</p>
                          </div>
                          
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 my-3">
                          <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-slate-500">
                            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                              <MapPin className="w-3.5 h-3.5 text-teal-600" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                              {getOppIcon(job.oppType)}
                              {job.workType}
                            </div>
                            {job.salary && job.salary.trim() !== '' && job.salary.toLowerCase() !== 'competitive' && (
                              <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                <DollarSign className="w-3.5 h-3.5 text-teal-600" />
                                {job.salary}
                              </div>
                            )}
                            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md border ${
                               statusFilter === 'Expired' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-gray-50 border-gray-100'
                            }`}>
                              <Clock className={`w-3.5 h-3.5 ${statusFilter === 'Expired' ? 'text-red-600' : 'text-teal-600'}`} />
                              <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 ml-auto" onClick={(e) => e.stopPropagation()}>
                            <Link 
                              to={`/opportunities/${job._id}`}
                              className="px-4 py-2 text-xs font-semibold text-[#2b6cb0] bg-blue-50 rounded-lg hover:bg-blue-100 border border-blue-100 transition-colors whitespace-nowrap"
                            >
                              Details
                            </Link>
                            {statusFilter === 'Active' && new Date(job.deadline) > new Date() && job.status === 'Active' ? (
                              <Link
                                to={`/opportunities/${job._id}`}
                                className="px-5 py-2 text-xs font-bold text-white bg-[#2b6cb0] rounded-lg hover:bg-blue-700 shadow-sm hover:shadow transition-all whitespace-nowrap"
                              >
                                Apply
                              </Link>
                            ) : (
                              <button disabled className="px-5 py-2 text-xs font-bold text-gray-400 bg-gray-200 rounded-lg cursor-not-allowed whitespace-nowrap">
                                Closed
                              </button>
                            )}
                          </div>
                        </div>

                        {job.tags && job.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-50">
                            {job.tags.map((tag, i) => (
                              <span key={i} className="text-[10px] uppercase font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
                ) : (
                  <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                    <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-slate-700">No {statusFilter.toLowerCase()} opportunities found</h3>
                    <button onClick={clearAllFilters} className="mt-2 text-sm text-[#2b6cb0] hover:underline font-medium">
                      Reset filters
                    </button>
                  </div>
                )}
              </div>
            )}

            {filteredJobs.length > 0 && totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
                <div className="text-sm text-slate-600">
                  Showing <span className="font-bold text-slate-800">{startIndex + 1}</span> to{' '}
                  <span className="font-bold text-slate-800">{Math.min(endIndex, filteredJobs.length)}</span> of{' '}
                  <span className="font-bold text-slate-800">{filteredJobs.length}</span> opportunities
                </div>
                <nav className="flex items-center gap-1">
                  <button 
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-colors ${
                      currentPage === 1
                        ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                        : 'border-gray-200 hover:bg-gray-50 text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  {getPageNumbers().map((page, index) => (
                    page === '...' ? (
                      <span key={`ellipsis-${index}`} className="px-2 text-slate-400">
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => goToPage(page as number)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg border text-sm font-bold transition-colors ${
                          currentPage === page
                            ? 'bg-[#2b6cb0] text-white border-[#2b6cb0] shadow-sm'
                            : 'border-gray-200 hover:bg-gray-50 text-slate-600 hover:text-slate-800'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  ))}
                  
                  <button 
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-colors ${
                      currentPage === totalPages
                        ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                        : 'border-gray-200 hover:bg-gray-50 text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Opportunities;