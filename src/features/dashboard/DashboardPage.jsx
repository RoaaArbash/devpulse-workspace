import React from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { FolderKanban, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { projects = [], tasks = [] } = useWorkspace();

  const totalProjects = projects.length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Done').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
  const pendingTasks = tasks.filter((t) => t.status === 'To Do').length;

  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const recentTasks = [...tasks].slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-zinc-100">Workspace Overview</h2>
        <p className="text-xs text-zinc-400">Real-time statistics and recent activities.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-zinc-900/60 border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
            <FolderKanban className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-zinc-400">Total Projects</p>
            <h3 className="text-xl font-bold text-zinc-100">{totalProjects}</h3>
          </div>
        </Card>

        <Card className="p-4 bg-zinc-900/60 border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-zinc-400">Completed Tasks</p>
            <h3 className="text-xl font-bold text-zinc-100">{completedTasks} <span className="text-xs font-normal text-zinc-500">/ {totalTasks}</span></h3>
          </div>
        </Card>

        <Card className="p-4 bg-zinc-900/60 border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-zinc-400">In Progress</p>
            <h3 className="text-xl font-bold text-zinc-100">{inProgressTasks}</h3>
          </div>
        </Card>

        <Card className="p-4 bg-zinc-900/60 border-zinc-800 flex items-center gap-4">
          <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-zinc-400">Pending (To Do)</p>
            <h3 className="text-xl font-bold text-zinc-100">{pendingTasks}</h3>
          </div>
        </Card>
      </div>

      {/* Workspace Overall Progress */}
      <Card className="p-5 bg-zinc-900/60 border-zinc-800 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-zinc-200">Overall Workspace Progress</span>
          <span className="font-mono text-indigo-400 font-bold">{overallProgress}%</span>
        </div>
        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </Card>

      {/* Recent Tasks Table/List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-zinc-200">Recent Tasks Activity</h3>
          <Link to="/kanban" className="text-xs text-indigo-400 hover:underline">
            View Kanban →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {recentTasks.length === 0 ? (
            <div className="text-center py-6 text-xs text-zinc-500">No tasks available.</div>
          ) : (
            recentTasks.map((task) => (
              <Card key={task.id} className="p-3 bg-zinc-900/40 border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-zinc-500">{task.id}</span>
                  <span className="text-xs font-medium text-zinc-200">{task.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={task.priority === 'High' ? 'danger' : 'default'}>
                    {task.priority || 'Normal'}
                  </Badge>
                  <Badge variant={task.status === 'Done' ? 'success' : 'info'}>
                    {task.status}
                  </Badge>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}