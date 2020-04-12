import * as React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Button }  from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    width: '100%'
  },
  action: {}
}));

const Actions = ({ onDelete }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Grid container>
        <Grid item>
          <Link to={`/main`}>
            <Button variant="outlined" className={classes.action} onClick={onDelete}>
              Delete
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Button variant="outlined" className={classes.action}>
            Edit Skill
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" className={classes.action}>
            Add Hours
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
} 

export default Actions;

