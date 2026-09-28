import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Kanban, BarChart3, Settings, Zap } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Projects', path: '/projects', icon: FolderKanban },
  { name: 'Kanban Board', path: '/kanban', icon: Kanban },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col justify-between p-4 min-h-screen">
      <div className="space-y-6">
        {/* App Brand */}
        <div className="flex items-center gap-3 px-2">
          <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-500/30">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-zinc-100 tracking-wide">DevPulse</h1>
            <p className="text-[10px] text-zinc-500 font-mono">Workspace SaaS</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User Info */}
      <div className="pt-4 border-t border-zinc-800 flex items-center gap-3 px-2">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Roaa"
          alt="Avatar"
          className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700"
        />
        <div className="overflow-hidden">
          <p className="text-xs font-semibold text-zinc-200 truncate">Roaa Arbash</p>
          <p className="text-[10px] text-zinc-500 truncate">Frontend Developer</p>
        </div>
      </div>
    </aside>
  );
}