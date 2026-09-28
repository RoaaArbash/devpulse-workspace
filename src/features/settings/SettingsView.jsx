import React, { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { User, Bell, Save, Check } from 'lucide-react';

export default function SettingsView() {
  const { userProfile = { name: 'Roaa Arbash', role: 'Frontend Developer', email: 'roaa@example.com' }, updateUserProfile } = useWorkspace();

  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: userProfile.name || 'Roaa Arbash',
    email: userProfile.email || 'roaa@example.com',
    role: userProfile.role || 'Frontend Developer',
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    taskUpdates: true,
    weeklyReport: false,
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (updateUserProfile) {
      updateUserProfile(profile);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-100">Settings</h2>
          <p className="text-xs text-zinc-400">Manage your workspace preferences and profile options.</p>
        </div>
        <Button variant="primary" onClick={handleSave} className="gap-2">
          {saved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
          {saved ? 'Changes Saved!' : 'Save Changes'}
        </Button>
      </div>

      {/* Profile Section */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-zinc-800 text-zinc-200 font-semibold text-sm">
          <User className="w-4 h-4 text-indigo-400" />
          <span>Profile Details</span>
        </div>

        <div className="flex items-center gap-4 py-2">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Roaa"
            alt="Profile Avatar"
            className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-indigo-500/50"
          />
          <div>
            <Button variant="secondary" className="text-xs py-1.5 px-3">
              Change Avatar
            </Button>
            <p className="text-[11px] text-zinc-500 mt-1">Supports SVG or PNG files</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Full Name</label>
            <Input
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Email Address</label>
            <Input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-zinc-400 mb-1">Job Title / Role</label>
            <Input
              value={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            />
          </div>
        </div>
      </Card>

      {/* Notifications Section */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-zinc-800 text-zinc-200 font-semibold text-sm">
          <Bell className="w-4 h-4 text-indigo-400" />
          <span>Notifications</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-xs font-medium text-zinc-200">Email Notifications</p>
              <p className="text-[11px] text-zinc-500">Receive email alerts for direct mentions and assignment updates.</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.emailAlerts}
              onChange={(e) => setNotifications({ ...notifications, emailAlerts: e.target.checked })}
              className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-t border-zinc-800/60">
            <div>
              <p className="text-xs font-medium text-zinc-200">Task Due Reminders</p>
              <p className="text-[11px] text-zinc-500">Get notified 24 hours before a task reaches its deadline.</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.taskUpdates}
              onChange={(e) => setNotifications({ ...notifications, taskUpdates: e.target.checked })}
              className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-t border-zinc-800/60">
            <div>
              <p className="text-xs font-medium text-zinc-200">Weekly Summary Report</p>
              <p className="text-[11px] text-zinc-500">Receive an automated productivity digest every Monday.</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.weeklyReport}
              onChange={(e) => setNotifications({ ...notifications, weeklyReport: e.target.checked })}
              className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}