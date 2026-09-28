import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Plus, Calendar, Filter, FolderKanban } from 'lucide-react';
import TaskDrawer from './TaskDrawer';
import TaskModal from './TaskModal';
import ConfirmModal from '../../components/ui/ConfirmModal';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useToast } from '../../components/ui/Toast';

const COLUMNS = [
  { id: 'Backlog', title: 'Backlog', color: 'border-zinc-700' },
  { id: 'To Do', title: 'To Do', color: 'border-sky-500/50' },
  { id: 'In Progress', title: 'In Progress', color: 'border-amber-500/50' },
  { id: 'Done', title: 'Done', color: 'border-emerald-500/50' },
];

export default function KanbanBoard() {
  const { tasks, projects, searchQuery, updateTask, deleteTask } = useWorkspace();
  const { showToast } = useToast();

  const [selectedTask, setSelectedTask] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);

  const [selectedPriority, setSelectedPriority] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState('ALL');

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  const onRequestDeleteTask = (taskId) => {
    setTaskToDeleteId(taskId);
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDeleteId) {
      deleteTask(taskToDeleteId);
      setIsDrawerOpen(false);
      showToast('Task deleted successfully', 'error');
      setTaskToDeleteId(null);
    }
  };

  const handleStatusChange = (taskId, newStatus) => {
    updateTask(taskId, { status: newStatus });
    showToast(`Task moved to ${newStatus}`, 'info');
    if (selectedTask) {
      setSelectedTask((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    updateTask(draggableId, { status: destination.droppableId });
    showToast(`Task status updated to ${destination.droppableId}`, 'info');
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Urgent': return <Badge variant="danger">Urgent</Badge>;
      case 'High': return <Badge variant="warning">High</Badge>;
      case 'Medium': return <Badge variant="info">Medium</Badge>;
      default: return <Badge variant="default">Low</Badge>;
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.id?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPriority =
      selectedPriority === 'ALL' || task.priority === selectedPriority;

    const matchesProject =
      selectedProject === 'ALL' || task.projectId === selectedProject;

    return matchesSearch && matchesPriority && matchesProject;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-100">Kanban Board</h2>
          <p className="text-xs text-zinc-400">Manage tasks and track team progress in real time.</p>
        </div>
        <Button variant="primary" className="gap-2 self-start sm:self-auto" onClick={() => setIsTaskModalOpen(true)}>
          <Plus className="w-4 h-4" /> Add New Task
        </Button>
      </div>

      {/* Filter Bar */}
      <Card className="p-3 bg-zinc-900/60 border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4">
          {/* Priority Filter */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Filter className="w-3.5 h-3.5" />
            <span>Priority:</span>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Project Filter */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Project:</span>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">All Projects</option>
              {projects?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Counter */}
        <span className="text-xs font-mono text-zinc-500">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </span>
      </Card>

      {/* Board Columns with DnD */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {COLUMNS.map((col) => {
            const columnTasks = filteredTasks.filter((t) => t.status === col.id);

            return (
              <div key={col.id} className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 flex flex-col min-h-[500px]">
                <div className={`flex items-center justify-between pb-3 mb-3 border-b-2 ${col.color}`}>
                  <span className="font-semibold text-sm text-zinc-200">{col.title}</span>
                  <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full font-mono">
                    {columnTasks.length}
                  </span>
                </div>

                <Droppable droppableId={col.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={`flex-1 space-y-3 transition-colors ${
                        snapshot.isDraggingOver ? 'bg-indigo-950/20 rounded-lg' : ''
                      }`}
                    >
                      {columnTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => handleTaskClick(task)}
                            >
                              <Card 
                                className={`p-4 transition-shadow cursor-pointer hover:border-indigo-500/50 ${
                                  snapshot.isDragging ? 'shadow-xl ring-2 ring-indigo-500/50 bg-zinc-800' : 'bg-zinc-800/40'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-[10px] font-mono text-zinc-500">{task.id}</span>
                                  {getPriorityBadge(task.priority)}
                                </div>

                                <h4 className="text-sm font-medium text-zinc-200 mb-3">{task.title}</h4>

                                <div className="flex items-center justify-between text-xs text-zinc-400 pt-3 border-t border-zinc-800">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                                    <span>{task.dueDate || 'No Date'}</span>
                                  </div>

                                  {task.assignee?.avatar ? (
                                    <img
                                      src={task.assignee.avatar}
                                      alt={task.assignee.name || 'User'}
                                      className="w-5 h-5 rounded-full bg-zinc-700 object-cover"
                                    />
                                  ) : (
                                    <div className="w-5 h-5 rounded-full bg-indigo-600/40 border border-indigo-400/30 text-indigo-300 font-bold text-[9px] flex items-center justify-center uppercase">
                                      {typeof task.assignee === 'string'
                                        ? task.assignee.substring(0, 2)
                                        : task.assignee?.name?.substring(0, 2) || 'US'}
                                    </div>
                                  )}
                                </div>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>

      {/* Task Drawer Container */}
      <TaskDrawer
        task={selectedTask}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onDeleteTask={onRequestDeleteTask}
        onStatusChange={handleStatusChange}
      />

      {/* Task Create Modal Container */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </div>
  );
}