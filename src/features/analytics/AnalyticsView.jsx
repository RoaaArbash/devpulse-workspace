import React from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import Card from '../../components/ui/Card';
import { CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export default function AnalyticsView() {
  const { tasks = [] } = useWorkspace();

  const totalCompleted = tasks.filter((t) => t.status === 'Done').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
  const todoTasks = tasks.filter((t) => t.status === 'To Do').length;
  const pendingTasks = todoTasks + inProgressTasks;
  const highPriorityTasks = tasks.filter((t) => t.priority === 'High' && t.status !== 'Done').length;

  const totalTasks = tasks.length;
  const velocityRate = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  const chartData = [
    { day: 'Mon', completed: Math.round(totalCompleted * 0.1) },
    { day: 'Tue', completed: Math.round(totalCompleted * 0.25) },
    { day: 'Wed', completed: Math.round(totalCompleted * 0.15) },
    { day: 'Thu', completed: Math.round(totalCompleted * 0.4) },
    { day: 'Fri', completed: Math.round(totalCompleted * 0.6) },
    { day: 'Sat', completed: Math.round(totalCompleted * 0.8) },
    { day: 'Sun', completed: totalCompleted },
  ];

  return (
    <div className="space-y-6 pb-6">
      <div>
        <p className="text-xs text-zinc-400">Monitor productivity metrics and task completion rates.</p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-zinc-900/60 border-zinc-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-zinc-400">Total Completed</span>
            <div className="text-2xl font-bold text-zinc-100">{totalCompleted}</div>
            <p className="text-[11px] text-emerald-400 font-medium">Real-time updated</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-4 bg-zinc-900/60 border-zinc-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-zinc-400">Tasks Pending</span>
            <div className="text-2xl font-bold text-zinc-100">{pendingTasks}</div>
            <p className="text-[11px] text-amber-400 font-medium">Active workload</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-4 bg-zinc-900/60 border-zinc-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-zinc-400">High Priority Tasks</span>
            <div className="text-2xl font-bold text-zinc-100">{highPriorityTasks}</div>
            <p className="text-[11px] text-rose-400 font-medium">Needs attention</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <AlertCircle className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-4 bg-zinc-900/60 border-zinc-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-medium text-zinc-400">Velocity Rate</span>
            <div className="text-2xl font-bold text-zinc-100">{velocityRate}%</div>
            <p className="text-[11px] text-indigo-400 font-medium">Optimal performance</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Main Chart Section */}
      <Card className="p-6 bg-zinc-900/60 border-zinc-800 space-y-4">
        <h3 className="text-sm font-bold text-zinc-200">Task Velocity (Weekly)</h3>
        
        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorVelocity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="day" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px', color: '#f4f4f5' }}
                itemStyle={{ color: '#818cf8' }}
              />
              <Area
                type="monotone"
                dataKey="completed"
                stroke="#6366f1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorVelocity)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6 bg-zinc-900/60 border-zinc-800 space-y-4">
        <h3 className="text-sm font-bold text-zinc-200">Status Distribution</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-400">To Do ({todoTasks})</span>
              <span className="text-zinc-400 font-mono">
                {totalTasks > 0 ? Math.round((todoTasks / totalTasks) * 100) : 0}%
              </span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-zinc-500 transition-all duration-300"
                style={{ width: `${totalTasks > 0 ? (todoTasks / totalTasks) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-400">In Progress ({inProgressTasks})</span>
              <span className="text-amber-400 font-mono">
                {totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0}%
              </span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${totalTasks > 0 ? (inProgressTasks / totalTasks) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-400">Done ({totalCompleted})</span>
              <span className="text-emerald-400 font-mono">
                {totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0}%
              </span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${totalTasks > 0 ? (totalCompleted / totalTasks) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}