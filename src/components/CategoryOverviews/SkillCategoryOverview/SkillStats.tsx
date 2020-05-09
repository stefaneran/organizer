import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography }  from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    width: '100%'
  }
}));

const SkillStats = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <Typography variant="h6">Stats and Charts - Coming Soon!</Typography>
    </Paper>
  )
} 

export default SkillStats;

