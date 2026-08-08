import { NavLink } from 'react-router-dom';
import { Menu, Home, FilePlus, Search, ShieldCheck, BarChart3 } from 'lucide-react';

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/submit', label: 'Submit', icon: FilePlus },
  { to: '/track', label: 'Track', icon: Search },
  { to: '/officer', label: 'Officer', icon: ShieldCheck },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 }
];

export default function TopNav() {
  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-niraivu-600 text-white shadow">
            <Menu className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-600">NiraivuAI</p>
            <h1 className="text-lg font-bold text-slate-900">Grievance Intelligence Platform</h1>
          </div>
        </div>

        <nav className="hidden items-center gap-4 md:flex">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-niraivu-600 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <item.icon className="mr-2 inline-block h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
