import React from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { CheckCircle2, Clock, FolderKanban, AlertCircle } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

export default function Dashboard() {
  const { tasks, projects } = useWorkspace();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Done').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
  const urgentTasks = tasks.filter((t) => t.priority === 'Urgent').length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const projectsWithLiveProgress = projects.map((project) => {
    const projectTasks = tasks.filter((t) => t.projectId === project.id);
    
    if (projectTasks.length > 0) {
      const doneCount = projectTasks.filter((t) => t.status === 'Done').length;
      const calculatedProgress = Math.round((doneCount / projectTasks.length) * 100);
      return { ...project, progress: calculatedProgress };
    }
    
    return project;
  });

  const stats = [
    { title: 'Total Tasks', value: totalTasks, icon: Clock, color: 'text-indigo-400' },
    { title: 'Completed Tasks', value: completedTasks, icon: CheckCircle2, color: 'text-emerald-400' },
    { title: 'In Progress', value: inProgressTasks, icon: FolderKanban, color: 'text-amber-400' },
    { title: 'Urgent Priority', value: urgentTasks, icon: AlertCircle, color: 'text-rose-400' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-zinc-100">Workspace Overview</h2>
        <p className="text-xs text-zinc-400">Track your project activity and productivity performance.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="p-4 bg-zinc-900/60 border-zinc-800/80">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-zinc-400 font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-zinc-100 mt-1">{stat.value}</p>
                </div>
                <div className={`p-2.5 rounded-lg bg-zinc-800/50 ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Projects Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-5 bg-zinc-900/60 border-zinc-800/80 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-bold text-zinc-200">Active Projects</h3>
            <span className="text-xs text-indigo-400 font-medium">{projects.length} Total</span>
          </div>

          <div className="space-y-4">
            {projectsWithLiveProgress.map((project) => (
              <div key={project.id} className="p-3 bg-zinc-800/30 border border-zinc-800/60 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-200">{project.name}</h4>
                    <p className="text-xs text-zinc-400">{project.description}</p>
                  </div>
                  <Badge variant={project.status === 'Completed' ? 'success' : 'info'}>
                    {project.status}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Global Progress Widget */}
        <Card className="p-5 bg-zinc-900/60 border-zinc-800/80 flex flex-col items-center justify-center text-center space-y-4">
          <h3 className="text-sm font-bold text-zinc-200 w-full text-left border-b border-zinc-800 pb-3">
            Task Completion Rate
          </h3>
          <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-zinc-800/40 border-4 border-indigo-500/30">
            <span className="text-3xl font-extrabold text-zinc-100 font-mono">{completionRate}%</span>
          </div>
          <p className="text-xs text-zinc-400">
            {completedTasks} out of {totalTasks} tasks are completed.
          </p>
        </Card>
      </div>
    </div>
  );
}