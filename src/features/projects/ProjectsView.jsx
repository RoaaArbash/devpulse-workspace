import React from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Plus, Calendar, CheckCircle } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

export default function ProjectsView() {
  const { projects = [], tasks = [], searchQuery = '' } = useWorkspace();

  const filteredProjects = projects.filter((project) => {
    if (!searchQuery || !searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase().trim();

    const nameMatch = project.name ? project.name.toLowerCase().includes(query) : false;
    const descMatch = project.description ? project.description.toLowerCase().includes(query) : false;
    const idMatch = project.id ? project.id.toLowerCase().includes(query) : false;

    const memberMatch = project.members
      ? project.members.some((m) => m.name && m.name.toLowerCase().includes(query))
      : false;

    return nameMatch || descMatch || idMatch || memberMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-100">Projects Overview</h2>
          <p className="text-xs text-zinc-400">Track active projects, deadlines, and overall progress.</p>
        </div>
        <Button variant="primary" className="gap-2">
          <Plus className="w-4 h-4" /> Create Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => {
          const projectTasks = tasks.filter((t) => t.projectId === project.id);
          const completedTasks = projectTasks.filter((t) => t.status === 'Done');
          const progress = projectTasks.length > 0
            ? Math.round((completedTasks.length / projectTasks.length) * 100)
            : project.progress || 0;

          return (
            <Card key={project.id} className="p-5 flex flex-col justify-between hover:border-zinc-700 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-zinc-500">{project.id}</span>
                  <Badge variant={project.status === 'Completed' || project.status === 'Done' ? 'success' : 'info'}>
                    {project.status || 'Active'}
                  </Badge>
                </div>

                <h3 className="text-lg font-semibold text-zinc-100 mb-2">{project.name}</h3>
                <p className="text-xs text-zinc-400 mb-6 line-clamp-2">{project.description}</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-zinc-800">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-zinc-400 font-medium">Progress</span>
                    <span className="text-zinc-200 font-mono">{progress}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between text-xs text-zinc-400 pt-2">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{project.dueDate || 'No Date'}</span>
                  </div>

                  {project.members && project.members.length > 0 ? (
                    <div className="flex -space-x-2">
                      {project.members.map((member, idx) => (
                        <img
                          key={idx}
                          src={member.avatar}
                          alt={member.name || 'Member'}
                          className="w-6 h-6 rounded-full border-2 border-zinc-900 bg-zinc-800"
                          title={member.name}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-zinc-500">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{completedTasks.length}/{projectTasks.length} Tasks</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-zinc-500 text-sm">
          No projects found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
}