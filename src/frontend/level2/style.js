import { styled } from '@mui/material/styles';

const style = styled((theme) => ({
  drawer: {
    width: 240,
  },
  drawerPaper: {
    width: 240,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
  taskCard: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export { Drawer, AppBar, Toolbar, Content, TaskCard };
