import { createContext, useState } from "react";

export const TaskManagerContext = createContext();
export const TaskManagerProvider = ({ children }) => {
	const [tasks, setTasks] = useState(localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []);

	const handleAddTask = (task) => {
		const newTask_ = {
			id: Date.now(),
			name: task,
			completed: false
		}
		setTasks([...tasks, newTask_]);
		localStorage.setItem('tasks', JSON.stringify([...tasks, newTask_]));
	};

	const handleUpdateTask = (updatedTask) => {
		const updatedTasks = tasks.map(task =>
			task.id === updatedTask.id ? updatedTask : task
		);
		setTasks(updatedTasks);
		localStorage.setItem('tasks', JSON.stringify(updatedTasks));
	};

	return (
		<TaskManagerContext.Provider value={{
			tasks,
			handleAddTask,
			handleUpdateTask
		}}>
			{children}
		</TaskManagerContext.Provider>
	);
}
