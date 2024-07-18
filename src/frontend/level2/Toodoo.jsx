import React from 'react';
import { Paper, TextField, Button, IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function TaskForm() {
  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <TextField
          label="Task name"
          fullWidth
        />
        <Button variant="contained" color="primary" startIcon={<AddIcon />}>
          Add task
        </Button>
      </Stack>
      <Stack direction="row" spacing={1} marginTop={1}>
        <IconButton color="primary">
          <PriorityHighIcon />
        </IconButton>
        <IconButton color="primary">
          <NotificationsIcon />
        </IconButton>
        <IconButton color="primary">
          <MoreHorizIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
}

export default TaskForm;
