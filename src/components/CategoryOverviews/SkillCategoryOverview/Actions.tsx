import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Button }  from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {},
  action: {}
}));

const Actions = () => {
  const classes = useStyles();
  return (
    <Paper>
      <Grid container>
        <Grid item>
          <Button variant="outlined" className={classes.action}>
            Delete
          </Button>
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

