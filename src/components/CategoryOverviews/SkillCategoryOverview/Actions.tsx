import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Button }  from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    width: '100%'
  },
  action: {}
}));

const Actions = ({ openDialog, onDelete }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Grid container>
        <Grid item>
          <Button variant="outlined" color="secondary" className={classes.action} onClick={onDelete}>
            Delete Skill
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" className={classes.action} onClick={openDialog({ type: 'updateGoal' })}>
            Change Week Goal
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" className={classes.action} onClick={openDialog({ type: 'updateHours' })}>
            Add Hours
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
} 

export default Actions;

