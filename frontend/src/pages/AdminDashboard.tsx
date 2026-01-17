import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { 
  Search, Filter, Plus, MoreHorizontal, 
  Edit3, Trash2, Eye,
  TrendingUp, Users, Briefcase, Clock,
  ArrowUpRight, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { dashboardAPI } from '../services/api';

interface Stat {
  label: string;
  value: number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: typeof Briefcase;
  color: string;
  bg: string;
}

interface Opportunity {
  _id: string;
  title: string;
  company: string;
  logo?: string;
  oppType: string;
  status: string;
  applicants: number;
  posted: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [stats, setStats] = useState<Stat[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Icon mapping
  const iconMap = {
    'Total Opportunities': Briefcase,
    'Total Applicants': Users,
    'Active Now': TrendingUp,
    'Closing Soon': Clock,
  };

  // Color mapping
  const colorMap = {
    'Total Opportunities': { color: 'text-blue-600', bg: 'bg-blue-50' },
    'Total Applicants': { color: 'text-emerald-600', bg: 'bg-emerald-50' },
    'Active Now': { color: 'text-indigo-600', bg: 'bg-indigo-50' },
    'Closing Soon': { color: 'text-amber-600', bg: 'bg-amber-50' },
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [statsResponse, opportunitiesResponse] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getRecentOpportunities(5)
      ]);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const statsData = statsResponse.data.data.stats.map((stat: any) => ({
        ...stat,
        icon: iconMap[stat.label as keyof typeof iconMap] || Briefcase,
        ...colorMap[stat.label as keyof typeof colorMap],
      }));

      setStats(statsData);
      setOpportunities(opportunitiesResponse.data.data.opportunities);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Error fetching dashboard data:', err);
      setError(err.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  const getLogoInitials = (company: string): string => {
    return company
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredOpportunities = opportunities.filter(opp =>
    opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    opp.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex bg-slate-50/50 min-h-screen font-sans text-slate-900">
        <AdminSidebar />
        <main className="flex-1 px-8 py-8 h-screen overflow-y-auto scroll-smooth flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-slate-600" />
            <p className="text-sm font-medium text-slate-500">Loading dashboard...</p>
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
            <p className="text-red-800 font-bold mb-2">Error loading dashboard</p>
            <p className="text-red-600 text-sm">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-colors"
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

      <main className="flex-1 px-8 py-8 h-screen overflow-y-auto scroll-smooth">
        
        {/* --- Top Header --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
            <p className="text-xs font-medium text-slate-500 mt-1">Manage your postings and track performance.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              to="/admin/opportunities" 
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-lg font-bold text-xs hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
            >
              <Plus size={16} />
              Post Opportunity
            </Link>
          </div>
        </div>

        {/* --- Stats Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-[0_2px_10px_-4px_rgba(6,81,237,0.1)] hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className={`${stat.bg} p-2 rounded-lg`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                {stat.trend !== 'neutral' && (
                  <span className={`flex items-center text-[10px] font-bold ${stat.trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'} px-1.5 py-0.5 rounded`}>
                    {stat.change}
                    <ArrowUpRight size={10} className={`ml-0.5 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-0.5">{formatNumber(stat.value)}</h3>
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* --- Management Section --- */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          
          {/* Table Toolbar */}
          <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
            <h3 className="font-bold text-sm text-slate-800">Recent Postings</h3>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-grow sm:flex-grow-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5" />
                <input 
                  type="text" 
                  placeholder="Search opportunities..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 transition-all" 
                />
              </div>
              <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors">
                <Filter size={16} />
              </button>
            </div>
          </div>

          {/* Elegant Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-left">
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Company & Role</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Applicants</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Posted</th>
                  <th className="px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredOpportunities.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-8 text-center">
                      <p className="text-sm text-slate-500 font-medium">
                        {searchQuery ? 'No opportunities found matching your search.' : 'No opportunities posted yet.'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredOpportunities.map((item) => (
                    <tr key={item._id} className="group hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          {/* Company Avatar / Logo Placeholder */}
                          <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-500">
                            {item.logo || getLogoInitials(item.company)}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">{item.title}</p>
                            <p className="text-[11px] font-medium text-slate-500">{item.company}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-600">
                          {item.oppType}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          item.status === 'Active' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                            : item.status === 'Draft' 
                              ? 'bg-slate-100 text-slate-600 border-slate-200' 
                              : 'bg-rose-50 text-rose-700 border-rose-100'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            item.status === 'Active' ? 'bg-emerald-500' : item.status === 'Draft' ? 'bg-slate-400' : 'bg-rose-500'
                          }`}></span>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                              {item.applicants > 0 && [1,2,3].slice(0, Math.min(3, item.applicants)).map(i => (
                                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200"></div>
                              ))}
                          </div>
                          <span className="text-xs font-bold text-slate-600 ml-1">{item.applicants}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Clock size={12} />
                          <span className="text-[11px] font-medium">{item.posted}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-right relative">
                        <button 
                          onClick={() => setActiveMenu(activeMenu === item._id ? null : item._id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                        >
                          <MoreHorizontal size={16} />
                        </button>

                        {/* Dropdown Menu */}
                        {activeMenu === item._id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)}></div>
                            <div className="absolute right-8 top-8 w-36 bg-white border border-slate-100 rounded-lg shadow-xl shadow-slate-200/50 z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                              <div className="p-1">
                                  <Link 
                                    to={`/opportunities/${item._id}`}
                                    className="w-full px-3 py-2 text-left text-[11px] font-bold text-slate-700 hover:bg-slate-50 rounded-md flex items-center gap-2"
                                    onClick={() => setActiveMenu(null)}
                                  >
                                  <Eye size={12} className="text-slate-400" /> View Details
                                  </Link>
                                  <Link
                                    to={`/admin/opportunities?edit=${item._id}`}
                                    className="w-full px-3 py-2 text-left text-[11px] font-bold text-slate-700 hover:bg-slate-50 rounded-md flex items-center gap-2"
                                    onClick={() => setActiveMenu(null)}
                                  >
                                  <Edit3 size={12} className="text-slate-400" /> Edit Post
                                  </Link>
                                  <div className="h-px bg-slate-100 my-1"></div>
                                  <button className="w-full px-3 py-2 text-left text-[11px] font-bold text-rose-600 hover:bg-rose-50 rounded-md flex items-center gap-2">
                                  <Trash2 size={12} /> Delete
                                  </button>
                              </div>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Compact Pagination */}
          {filteredOpportunities.length > 0 && (
            <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between bg-gray-50/50">
              <p className="text-[11px] text-slate-500 font-medium">
                Showing <span className="font-bold text-slate-700">1-{filteredOpportunities.length}</span> of {opportunities.length}
              </p>
              <Link
                to="/admin/opportunities"
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                View All →
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;