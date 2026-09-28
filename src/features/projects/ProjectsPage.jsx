import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Plus, FolderKanban, Trash2 } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import ProjectModal from './ProjectModal';

export default function ProjectsPage() {
  const { projects = [], tasks = [], deleteProject, searchQuery = '' } = useWorkspace();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = projects.filter((project) => {
    if (!searchQuery || !searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase().trim();
    const nameMatch = project.name ? project.name.toLowerCase().includes(query) : false;
    const descMatch = project.description ? project.description.toLowerCase().includes(query) : false;
    const idMatch = project.id ? project.id.toLowerCase().includes(query) : false;

    return nameMatch || descMatch || idMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-100">Projects Directory</h2>
          <p className="text-xs text-zinc-400">Manage all ongoing workspace applications and repositories.</p>
        </div>
        <Button variant="primary" className="gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" /> New Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full py-12 text-center text-zinc-500 text-sm">
            {searchQuery ? `No projects found matching "${searchQuery}"` : 'No projects found. Click "New Project" to create your first project!'}
          </div>
        ) : (
          filteredProjects.map((project) => {
            const projectTasks = tasks.filter((t) => t.projectId === project.id);
            const total = projectTasks.length;
            const completed = projectTasks.filter((t) => t.status === 'Done').length;
            const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

            return (
              <Card key={project.id} className="p-5 bg-zinc-900/60 border-zinc-800/80 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                        <FolderKanban className="w-5 h-5" />
                      </div>
                      <div>
                        {/* 👈 رابط ديناميكي ينقل لصفحة تفاصيل المشروع */}
                        <Link to={`/projects/${project.id}`} className="group">
                          <h3 className="text-sm font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors">
                            {project.name}
                          </h3>
                        </Link>
                        <span className="text-[10px] font-mono text-zinc-500">{project.id}</span>
                      </div>
                    </div>
                    <Badge variant={project.status === 'Completed' ? 'success' : 'info'}>
                      {project.status}
                    </Badge>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2">
                    {project.description || 'No description provided.'}
                  </p>
                </div>

                {/* Progress & Actions */}
                <div className="space-y-3 pt-3 border-t border-zinc-800/80">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                      <span>Tasks: {completed}/{total}</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="text-zinc-500 hover:text-rose-400 transition-colors p-1"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Modal */}
      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}