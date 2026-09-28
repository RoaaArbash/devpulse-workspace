import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User } from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-semibold text-zinc-200">DevPulse Workspace</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* User Profile Info */}
        {user && (
          <div className="flex items-center gap-3 pl-4 border-l border-zinc-800">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-medium text-xs">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />
              ) : (
                <User className="w-4 h-4" />
              )}
            </div>

            <div className="hidden sm:block text-left">
              <p className="text-xs font-medium text-zinc-200">{user.name}</p>
              <p className="text-[10px] text-zinc-500">{user.email}</p>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              title="Sign Out"
              className="p-2 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors ml-2"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}