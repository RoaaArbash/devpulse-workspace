import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialTasks, initialProjects } from '../types/mockData';

const WorkspaceContext = createContext(null);

export function WorkspaceProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');

  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('devpulse_tasks');
      return savedTasks ? JSON.parse(savedTasks) : initialTasks;
    } catch {
      return initialTasks;
    }
  });

  const [projects, setProjects] = useState(() => {
    try {
      const savedProjects = localStorage.getItem('devpulse_projects');
      return savedProjects ? JSON.parse(savedProjects) : initialProjects;
    } catch {
      return initialProjects;
    }
  });

  useEffect(() => {
    localStorage.setItem('devpulse_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('devpulse_projects', JSON.stringify(projects));
  }, [projects]);

  const addTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: `TASK-${Date.now().toString().slice(-3)}`,
    };
    setTasks((prev) => [taskWithId, ...prev]);
  };

  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedFields } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const addProject = (newProject) => {
    const projectWithId = {
      ...newProject,
      id: `PRJ-${Date.now().toString().slice(-2)}`,
      progress: 0,
      members: newProject.members || [],
    };
    setProjects((prev) => [projectWithId, ...prev]);
  };

  const updateProject = (id, updatedFields) => {
    setProjects((prev) =>
      prev.map((project) => (project.id === id ? { ...project, ...updatedFields } : project))
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  return (
    <WorkspaceContext.Provider
      value={{
        tasks,
        projects,
        searchQuery,
        setSearchQuery,
        addTask,
        updateTask,
        deleteTask,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}

export default useWorkspace;