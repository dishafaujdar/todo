// src/App.js
import React, { useState } from 'react';
import {
  AppBar as MuiAppBar,
  Box,
  CssBaseline,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar as MuiToolbar,
  Typography,
  Button,
  Container,
  Paper,
  Grid,
  TextField,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import ActivityIcon from '@mui/icons-material/LocalActivity';

const MyApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ date: '', text: '', priority: 'Low' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const addTask = () => {
    if (newTask.date && newTask.text) {
      setTasks((prev) => [...prev, newTask]);
      setNewTask({ date: '', text: '', priority: 'Low' });
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MuiAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <MuiToolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            TODOist
          </Typography>
        </MuiToolbar>
      </MuiAppBar>
      <MuiDrawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
          },
        }}
        variant="permanent"
      >
        <MuiToolbar />
        <List>
          {[
            { text: 'Dashboard', icon: <DashboardIcon /> },
            { text: 'Tasks', icon: <AssignmentIcon /> },
            { text: 'Activity', icon: <ActivityIcon /> },
            { text: 'Notifications', icon: <NotificationsIcon /> },
            { text: 'Settings', icon: <SettingsIcon /> },
          ].map((item) => (
            <ListItem button key={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </MuiDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <MuiToolbar />
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
              label="Task"
              name="text"
              value={newTask.text}
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
              <MenuItem value="High">High</MenuItem>
            </TextField>
          </Box>
          {tasks.map((task, index) => (
            <Box key={index} mb={3}>
              <Typography variant="h6" gutterBottom>
                {task.date}
              </Typography>
              <Paper sx={{ padding: 2, marginBottom: 2 }}>
                <Grid container alignItems="center" justifyContent="space-between">
                  <Grid item xs={8}>
                    <Typography>{task.text}</Typography>
                  </Grid>
                  <Grid item xs={4} textAlign="right">
                    <Typography color={task.priority === 'High' ? 'error' : 'textSecondary'}>
                      {task.priority} Priority
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          ))}
        </Container>
      </Box>
    </Box>
  );
};

export default MyApp;
