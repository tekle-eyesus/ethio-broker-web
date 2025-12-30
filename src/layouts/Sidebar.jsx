import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  AlertTriangle,
  Wallet,
  Building2,
  Settings,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Policies", href: "/policies", icon: FileText },
  { name: "Claims", href: "/claims", icon: AlertTriangle },
  { name: "Finance", href: "/finance", icon: Wallet },
  { name: "Carriers", href: "/carriers", icon: Building2 },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className='h-screen w-64 bg-slate-900 text-white flex flex-col fixed left-0 top-0'>
      <div className='p-6'>
        <h1 className='text-xl font-bold tracking-wider'>EthioBroker</h1>
        <p className='text-xs text-slate-400 mt-1'>Management System</p>
      </div>

      <nav className='flex-1 px-4 space-y-2 mt-4'>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-sm font-medium",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className='p-4 border-t border-slate-800'>
        <Link
          to='/settings'
          className='flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white text-sm font-medium'
        >
          <Settings size={20} />
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
