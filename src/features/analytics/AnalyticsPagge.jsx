import React from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { BarChart3, PieChart, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function AnalyticsPage() {
  const { projects = [], tasks = [] } = useWorkspace();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Done').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
  const todoTasks = tasks.filter((t) => t.status === 'To Do').length;

  const highPriority = tasks.filter((t) => t.priority === 'High').length;
  const mediumPriority = tasks.filter((t) => t.priority === 'Medium').length;
  const lowPriority = tasks.filter((t) => t.priority === 'Low').length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-zinc-100">Analytics & Insights</h2>
        <p className="text-xs text-zinc-400">Deep dive into workspace metrics, priority distribution, and project velocity.</p>
      </div>

      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 bg-zinc-900/60 border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Task Completion Rate</span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-zinc-100">{completionRate}%</div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${completionRate}%` }} />
          </div>
        </Card>

        <Card className="p-5 bg-zinc-900/60 border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Total Active Tasks</span>
            <BarChart3 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-zinc-100">{totalTasks}</div>
          <p className="text-[11px] text-zinc-500">{completedTasks} completed across all projects</p>
        </Card>

        <Card className="p-5 bg-zinc-900/60 border-zinc-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">High Priority Load</span>
            <PieChart className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-zinc-100">{highPriority}</div>
          <p className="text-[11px] text-zinc-500">Tasks requiring immediate attention</p>
        </Card>
      </div>

      {/* Status & Priority Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Task Status Distribution */}
        <Card className="p-5 bg-zinc-900/60 border-zinc-800 space-y-4">
          <h3 className="text-sm font-bold text-zinc-200">Task Status Breakdown</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400">To Do ({todoTasks})</span>
                <span className="text-zinc-400 font-mono">{totalTasks > 0 ? Math.round((todoTasks / totalTasks) * 100) : 0}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-zinc-500 transition-all duration-300" style={{ width: `${totalTasks > 0 ? (todoTasks / totalTasks) * 100 : 0}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400">In Progress ({inProgressTasks})</span>
                <span className="text-amber-400 font-mono">{totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${totalTasks > 0 ? (inProgressTasks / totalTasks) * 100 : 0}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400">Done ({completedTasks})</span>
                <span className="text-emerald-400 font-mono">{totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }} />
              </div>
            </div>
          </div>
        </Card>

        {/* Priority Breakdown */}
        <Card className="p-5 bg-zinc-900/60 border-zinc-800 space-y-4">
          <h3 className="text-sm font-bold text-zinc-200">Tasks Priority Distribution</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400">High Priority ({highPriority})</span>
                <span className="text-rose-400 font-mono">{totalTasks > 0 ? Math.round((highPriority / totalTasks) * 100) : 0}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 transition-all duration-300" style={{ width: `${totalTasks > 0 ? (highPriority / totalTasks) * 100 : 0}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400">Medium Priority ({mediumPriority})</span>
                <span className="text-amber-400 font-mono">{totalTasks > 0 ? Math.round((mediumPriority / totalTasks) * 100) : 0}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${totalTasks > 0 ? (mediumPriority / totalTasks) * 100 : 0}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-400">Low Priority ({lowPriority})</span>
                <span className="text-indigo-400 font-mono">{totalTasks > 0 ? Math.round((lowPriority / totalTasks) * 100) : 0}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${totalTasks > 0 ? (lowPriority / totalTasks) * 100 : 0}%` }} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}