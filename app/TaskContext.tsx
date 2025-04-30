import React, { createContext, useState, useContext } from 'react';

// 1. Create a context type
export type TaskContextType = {
  tasks: string[];
  setTasks: React.Dispatch<React.SetStateAction<string[]>>;
};

// 2. Create the context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// 3. Create the provider component
export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<string[]>([
    'React Native',
    'Expo',
    'JavaScript',
    'Mobile Development',
    'Assignment 3',
  ]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

// 4. Export a custom hook to use the context
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
