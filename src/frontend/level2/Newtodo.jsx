import React from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  Grid,
  TextField,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import ReportIcon from '@mui/icons-material/Report';
import ActivityIcon from '@mui/icons-material/LocalActivity';
import style from './style';
export { Drawer, AppBar, Toolbar, Content, TaskCard };

const NewTodo = () => {
  const classes = style();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            DhiWise
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {[
            { text: 'Dashboard', icon: <DashboardIcon /> },
            { text: 'Tasks', icon: <AssignmentIcon /> },
            { text: 'Activity', icon: <ActivityIcon /> },
            { text: 'Project Management', icon: <ReportIcon /> },
            { text: 'Reports', icon: <ReportIcon /> },
            { text: 'Notifications', icon: <NotificationsIcon /> },
            { text: 'Settings', icon: <SettingsIcon /> },
          ].map((item, index) => (
            <ListItem button key={item.text}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container>
          <Box display="flex" justifyContent="space-between" mb={3}>
            <Typography variant="h4">My Tasks</Typography>
            <Button variant="contained" color="primary">Add</Button>
          </Box>
          {[
            {
              date: 'Monday, 12th May',
              tasks: [
                { text: 'Buy groceries', priority: 'High' },
                { text: 'Cardio at 6 pm', priority: 'Low' },
              ],
            },
            {
              date: 'Wednesday, 14th May',
              tasks: [
                { text: 'Buy groceries', priority: 'High' },
                { text: 'Cardio at 6 pm', priority: 'Low' },
              ],
            },
          ].map((day) => (
            <Box key={day.date} mb={3}>
              <Typography variant="h6" gutterBottom>
                {day.date}
              </Typography>
              {day.tasks.map((task) => (
                <Paper key={task.text} className={classes.taskCard}>
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
              ))}
            </Box>
          ))}
        </Container>
      </main>
    </Box>
  );
};

export default NewTodo;
