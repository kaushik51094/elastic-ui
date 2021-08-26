import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Elastic from './Components/Elastic'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Elastic-UI
        </Typography>
      </Toolbar>
    </AppBar>
    <Elastic />
    </div>
  );
}

export default App;
