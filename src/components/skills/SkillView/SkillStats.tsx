import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Typography }  from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    height: '100%',
    width: '100%',
    padding: '1em',
    backgroundColor: theme.palette.primary.main,
    color: '#fff'
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

