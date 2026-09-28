import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWorkspace } from '../../context/WorkspaceContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { ArrowLeft, CheckCircle2, Circle, Clock, Folder } from 'lucide-react';

export default function ProjectDetailsPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects = [], tasks = [], updateTaskStatus } = useWorkspace();

  const project = projects.find((p) => String(p.id) === String(projectId));

  if (!project) {
    return (
      <div className="space-y-4 text-center py-12">
        <p className="text-zinc-400">Project not found.</p>
        <Button variant="outline" onClick={() => navigate('/projects')}>
          Back to Projects
        </Button>
      </div>
    );
  }

  const projectTasks = tasks.filter(
    (t) => String(t.projectId) === String(project.id) || t.project === project.name
  );

  const completedTasks = projectTasks.filter((t) => t.status === 'Done').length;
  const progress = projectTasks.length > 0 ? Math.round((completedTasks / projectTasks.length) * 100) : 0;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate('/projects')}
        className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </button>

      {/* Hero Header */}
      <div className="flex items-start justify-between border-b border-zinc-800/80 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Folder className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-zinc-100">{project.name}</h1>
              <Badge variant={project.status === 'Completed' ? 'success' : 'indigo'}>
                {project.status || 'Active'}
              </Badge>
            </div>
            <p className="text-xs text-zinc-500 font-mono mt-1">ID: {project.id}</p>
          </div>
        </div>
      </div>

      {/* About Project Card */}
      <Card className="p-6 bg-zinc-900/60 border-zinc-800 space-y-4">
        <h3 className="text-sm font-bold text-zinc-200">About Project</h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          {project.description || 'No description provided for this project.'}
        </p>

        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs">
            <span className="text-zinc-400 font-medium">Overall Progress</span>
            <span className="text-indigo-400 font-bold font-mono">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Project Tasks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-zinc-100">
            Project Tasks ({projectTasks.length})
          </h3>
        </div>

        {projectTasks.length === 0 ? (
          <Card className="p-12 text-center bg-zinc-900/40 border-zinc-800">
            <p className="text-xs text-zinc-500">No tasks assigned to this project yet.</p>
          </Card>
        ) : (
          <div className="space-y-2">
            {projectTasks.map((task) => (
              <Card
                key={task.id}
                className="p-4 bg-zinc-900/60 border-zinc-800 flex items-center justify-between hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateTaskStatus &&
                      updateTaskStatus(task.id, task.status === 'Done' ? 'To Do' : 'Done')
                    }
                    className="text-zinc-500 hover:text-indigo-400 transition-colors"
                  >
                    {task.status === 'Done' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : task.status === 'In Progress' ? (
                      <Clock className="w-5 h-5 text-amber-400" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>
                  <div>
                    <span
                      className={`text-xs font-medium ${
                        task.status === 'Done' ? 'line-through text-zinc-500' : 'text-zinc-200'
                      }`}
                    >
                      {task.title}
                    </span>
                    {task.priority && (
                      <span className="ml-2 text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                        {task.priority}
                      </span>
                    )}
                  </div>
                </div>

                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus && updateTaskStatus(task.id, e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-xs text-zinc-300 focus:outline-none focus:border-indigo-500"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}