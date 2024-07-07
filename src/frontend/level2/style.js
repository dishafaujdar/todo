// src/styles.js
import { styled } from '@mui/material/styles';

const Drawer = styled('div')(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
  },
}));

const AppBar = styled('div')(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const Toolbar = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Content = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const TaskCard = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export { Drawer, AppBar, Toolbar, Content, TaskCard };
