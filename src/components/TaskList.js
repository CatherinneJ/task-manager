import { useContext, useState } from "react";
import { TaskManagerContext } from "../context/task-manager-context";

function TaskListItem({ task }) {
	const { handleUpdateTask } = useContext(TaskManagerContext);
	const [isEditing, setIsEditing] = useState(false);
	const [newTaskName, setNewTaskName] = useState(task.name);
	const style = getStyle();

	return (
		<li key={task.id} style={style.listItem}>
			<input
				type="checkbox"
				checked={task.completed}
				onChange={() => handleUpdateTask({ ...task, completed: !task.completed })}
				style={{ marginRight: '10px' }}
			/>
			{isEditing ? (
				<>
					<input
						type="text"
						value={newTaskName}
						onChange={(e) => setNewTaskName(e.target.value)}
						style={{ marginRight: '10px', padding: '5px', borderRadius: '5px', border: '1px solid #ccc', width: '150px' }}
					/>
					<button
						onClick={() => {
							handleUpdateTask({ ...task, name: newTaskName });
							setIsEditing(false);
						}}
						style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
					>
						Save
					</button>
				</>
			) : (
				<>
					<span style={{ marginRight: '10px' }}>{task.name}</span>
					<button
						onClick={() => setIsEditing(true)}
						style={{ backgroundColor: 'orange', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
					>
						Edit
					</button>
				</>
			)}
		</li>
	);
}

export default function TaskList(props) {
	const { tasks, handleAddTask } = useContext(TaskManagerContext);
	const [newTask, setNewTask] = useState("");
	const style = getStyle();

	return (
		<div style={style.container}>
			<form onSubmit={(e) => {
				e.preventDefault();
				if (newTask.trim() === "") return;
				handleAddTask(newTask);
				setNewTask("");
			}}>
				<label htmlFor="task" style={style.label}>New Task:</label>
				<input type="text" id="task" style={style.input} value={newTask} onChange={(e) => setNewTask(e.target.value)} />
				<button type="submit" style={style.button}>Add Task</button>
			</form>
			<ul style={style.list}>
				{tasks.filter(task => !task.completed).map((task, index) => (
					<TaskListItem
						key={task.id}
						task={task}
					/>
				))}
			</ul>
			{tasks.length === 0 && <p style={{ color: 'white' }}>No tasks available.</p>}
		</div>
	)
}

const getStyle = () => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px',
		marginTop: '20px'
	},
	label: {
		fontWeight: 'bold',
		marginRight: '10px',
		color: '#ffffff'
	},
	input: {
		marginRight: '10px',
		padding: '5px',
		borderRadius: '5px',
		border: '1px solid #ccc',
		width: '200px',
		height: '30px',
	},
	button: {
		marginLeft: '10px',
		backgroundColor: 'rgb(71, 9, 148)',
		color: 'white',
		border: 'none',
		padding: '15px 10px',
		cursor: 'pointer',
		fontWeight: 'bold',
	},
	list: {
		listStyleType: 'none',
		padding: '0',
		margin: '0',
		color: '#ffffff',
		border: '3px solid rgb(71, 9, 148)',
		marginTop: '20px',
		width: '45%',
	},
	listItem: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '10px',
		borderBottom: '1px solid #ccc',
		color: '#ffffff',
		backgroundColor: 'rgba(71, 9, 148, 0.6)',
		fontSize: '25px',
	}
})