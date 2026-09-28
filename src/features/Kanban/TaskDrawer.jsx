import React from 'react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { X, Calendar, User, Tag, Trash2, CheckSquare } from 'lucide-react';

export default function TaskDrawer({ task, isOpen, onClose, onDeleteTask, onStatusChange }) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div className="relative w-full max-w-lg bg-zinc-900 border-l border-zinc-800 h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto z-10">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800">
            <span className="text-xs font-mono text-zinc-500">{task.id}</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onDeleteTask(task.id)}
                className="p-2 text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 rounded-lg transition-colors"
                title="Delete Task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button 
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-zinc-100 mb-4">{task.title}</h3>

          {/* Status Selector */}
          <div className="mb-6">
            <label className="text-xs font-medium text-zinc-400 mb-2 block">Status</label>
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 text-sm text-zinc-200 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500"
            >
              <option value="Backlog">Backlog</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          {/* Meta Info Grid */}
          <div className="space-y-4 mb-6 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-800/50">
              <span className="text-zinc-500 flex items-center gap-2">
                <User className="w-4 h-4" /> Assignee
              </span>
              <div className="flex items-center gap-2">
                <img src={task.assignee.avatar} alt="" className="w-5 h-5 rounded-full" />
                <span className="text-zinc-200 font-medium">{task.assignee.name}</span>
              </div>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-zinc-800/50">
              <span className="text-zinc-500 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Due Date
              </span>
              <span className="text-zinc-200 font-medium">{task.dueDate}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-zinc-800/50">
              <span className="text-zinc-500 flex items-center gap-2">
                <Tag className="w-4 h-4" /> Priority
              </span>
              <Badge variant={task.priority === 'Urgent' ? 'danger' : 'warning'}>
                {task.priority}
              </Badge>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-xs font-medium text-zinc-400 mb-2">Description</h4>
            <div className="p-3 bg-zinc-800/40 border border-zinc-800 rounded-lg text-sm text-zinc-300 leading-relaxed">
              {task.description || "No description provided."}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-zinc-800 flex justify-end">
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}