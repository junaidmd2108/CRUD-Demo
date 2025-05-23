import React,{useState,useEffect} from "react"  ;
import axios from "axios";
import {
    List,
    ListItem,
    ListItemText,
    Checkbox,
IconButton,
    
    TextField,
    Button

}

from "@mui/material";
import { Delete } from "@mui/icons-material";
const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({title: '',description:''} );
    useEffect(() => {
        fetchTasks();
    }
    , []);
    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };
    const handleInputChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/tasks", newTask);
            setNewTask({ title: '', description: '' });
            fetchTasks();
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };
    const handleToggle = async (id) => {
        try {
            const task = tasks.find((task) => task.id === id);
            await axios.put(`http://localhost:8080/api/tasks/${id}`, {
                ...task,
                completed: !task.completed,
            });
            fetchTasks();
        } catch (error) {
            console.error("Error toggling task:", error);
        }
    };
    return (
        <div>
            <h1>Task List</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="title"
                    label="Title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    name="description"
                    label="Description"
                    value={newTask.description}
                    onChange={handleInputChange}
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Add Task
                </Button>
            </form>
            <List>
                {tasks.map((task) => (
                    <ListItem key={task.id}>
                        <Checkbox
                            checked={task.completed}
                            onChange={() => handleToggle(task.id)}
                        />
                        <ListItemText primary={task.title} secondary={task.description} />
                        <IconButton edge="end" onClick={() => handleDelete(task.id)}>
                            <Delete />
                        </IconButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}
export default TaskList;        