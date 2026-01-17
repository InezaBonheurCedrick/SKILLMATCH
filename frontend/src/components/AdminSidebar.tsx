import React from "react";
import {
  LayoutDashboard,
  PlusCircle,
  Users,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";


interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

interface SidebarProps {
  role?: string;
}

const AdminSidebar: React.FC<SidebarProps> = ({ role = "Admin" }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const navItems: NavItem[] = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { label: "Opportunity", icon: PlusCircle, path: "/admin/opportunities" },
    { label: "Applications", icon: Users, path: "/admin/applications" },
    { label: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <aside className="w-64 bg-slate-900 min-h-screen flex flex-col text-slate-300">
        <Link to="/" className="cursor-pointer">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div>
          <h1 className="text-white font-bold text-sm tracking-tight">
            RightPool Portal
          </h1>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            {role}
          </p>
        </div>
      </div>
        </Link>

      <nav className="flex-grow p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all group ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                  : "hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  size={18}
                  className={
                    isActive
                      ? "text-white"
                      : "text-slate-500 group-hover:text-blue-400"
                  }
                />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {isActive && <ChevronRight size={14} />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-1">
        <button
          type="button"
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
