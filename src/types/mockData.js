export const initialTasks = [
  {
    id: 'TASK-101',
    title: 'Implement Drag & Drop for Kanban Board',
    status: 'To Do',
    priority: 'High',
    dueDate: '2026-08-25',
    assignee: {
      name: 'Roaa Arbash',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roaa',
    },
    description: 'Use @hello-pangea/dnd to build fluid column reordering and optimistic UI updates.',
  },
  {
    id: 'TASK-102',
    title: 'Design Dark Mode Theme System',
    status: 'In Progress',
    priority: 'Medium',
    dueDate: '2026-08-22',
    assignee: {
      name: 'Alex Rivera',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    },
    description: 'Ensure Tailwind CSS slate/zinc classes maintain high contrast and accessibility standards.',
  },
  {
    id: 'TASK-103',
    title: 'Create Reusable Side Drawer Component',
    status: 'To Do',
    priority: 'Urgent',
    dueDate: '2026-08-20',
    assignee: {
      name: 'Roaa Arbash',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roaa',
    },
    description: 'Drawer should slide out smoothly and show complete task information with edit options.',
  },
];

export const initialProjects = [
  {
    id: 'PRJ-01',
    name: 'DevPulse Dashboard UI',
    description: 'Design and develop modern React workspace dashboard.',
    status: 'In Progress',
    progress: 75,
    dueDate: '2026-09-15',
    members: [
      { name: 'Roaa', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roaa' },
      { name: 'Alex', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' }
    ]
  },
  {
    id: 'PRJ-02',
    name: 'ATS Resume Analyzer API',
    description: 'Build RESTful API backend for candidate resume matching.',
    status: 'In Progress',
    progress: 40,
    dueDate: '2026-10-01',
    members: [
      { name: 'Roaa', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roaa' }
    ]
  },
  {
    id: 'PRJ-03',
    name: 'E-Commerce Mobile App',
    description: 'Cross-platform app integration using React Native.',
    status: 'Completed',
    progress: 100,
    dueDate: '2026-07-30',
    members: [
      { name: 'Sarah', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
      { name: 'Alex', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' }
    ]
  }
];