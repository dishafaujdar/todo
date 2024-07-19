import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  AppBar as MuiAppBar,
  Box,
  CssBaseline,
  IconButton,
  Typography,
  Button,
  Container,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Checkbox
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const MyApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ content: '', time: '' ,date: '', priority: 'Low' });
  const [remaind,setRemind] = useState()
  const token = localStorage.getItem('token'); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:3000/newtodo', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        if (!response.ok) {
          throw new Error('Forbidden');
        }
        const result = await response.json();
        setTasks(result);
        result.forEach(scheduleReminder);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (newTask.date && newTask.time && newTask.content) {
      try {
        const response = await fetch('http://localhost:3000/newtodo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: newTask.content,
            time: newTask.time,
            date: newTask.date,
            priority: newTask.priority,
          }),
        });

        if (!response.ok) {
          throw new Error('Forbidden');
        }

        const result = await response.json();
        const createdTask = result.todo;
        setTasks((prev) => [...prev, { ...createdTask, completed: false }]);
        setNewTask({ content: '', time:'', date: '', priority: 'Low' });
        scheduleReminder(createdTask);
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  const toggle = (index) => {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (indexToDelete) => {
    setTasks((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  const scheduleReminder = (task) => {
    const taskTime = new Date(`${task.date}T${task.time}`);
    const now = new Date();
    const timeUntilReminder = taskTime.getTime() - now.getTime();

    if (timeUntilReminder > 0) {
      setTimeout(() => {
        alert(`Reminder: You have a task "${task.content}" scheduled now.`);
      }, timeUntilReminder);
    }
  };
  const remindMe = (task) => {
    alert(`Reminder: You have a task "${task.content}" scheduled on ${new Date(task.date)}`);
    setRemind()
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4">My Tasks</Typography>
        <Button variant="contained" color="primary" onClick={addTask}>
          Add Task
        </Button>
      </Box>
      <Box mb={3}>
        <TextField
          label="Date"
          type="date"
          name="date"
          value={newTask.date}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="time"
          type="time"
          name="time"
          value={newTask.time}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Task"
          name="content"
          value={newTask.content}
          onChange={handleInputChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Priority"
          name="priority"
          value={newTask.priority}
          onChange={handleInputChange}
          select
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </TextField>
      </Box>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{ mb: 2, p: 2, backgroundColor: task.completed ? 'lightgray' : 'white' }}
          >
            <Box display="flex" justifyContent="space-between">
              <Box>
                <Typography variant="h6">
                {new Date(task.date).toLocaleDateString()} {task.time}
                </Typography>
                <Typography variant="h6">{task.content}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {task.priority}
                </Typography>
              </Box>
              <Box>
                <Button onClick={() => deleteTask(index)} color="secondary">Delete</Button>
                <Checkbox checked={task.completed} onChange={() => toggle(index)} />
                <br></br>
                <Button variant="outlined" color="secondary" onClick={() => remindMe(task)}>
                  Remind Me
                  <Toaster/>
                </Button>
              </Box>
                
            </Box>
          </Paper>
                
        ))
      ) : (
        <Typography>No tasks available</Typography>
      )}
    </Container>
  );
};

export default MyApp;
