import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Divider, Button } from '@material-ui/core';
import UpdateIcon from '@material-ui/icons/Update';
import { ISkillCategory } from '@interfaces/categories/skill/Skill.interface';
import { getRankByXP } from '@logic/skill.logic';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '0.5em',
    cursor: 'pointer'
  },
  paper: {
    width: '100%',
    padding: '0.5em'
  },
  button: {
    width: '100%'
  },
  title: {
    marginBottom: '0.5em'
  },
  activity: {
    display: 'flex',
    width: '100%',
    overflow: 'hidden'
  },
  activityText: {
    padding: '0.5em 0',
    paddingRight: '0.5em',
    paddingLeft: '0.5em'
  },
  progress: {
    height: '100%',
    width: '100%'
  }
}));

const SkillCategoryThumbnail = (skill: ISkillCategory) => {
  const classes = useStyles();
  const { title, totalXP } = skill;
  const rank = getRankByXP(totalXP);

  return (
    <Paper className={clsx(classes.container, 'theme-level-3')}>

      <Paper className={clsx(classes.paper, classes.title)}>
        <Typography variant="subtitle1">{title}</Typography>
      </Paper>

      <Grid container spacing={1} style={{ marginBottom: '0.2em' }}> 
        <Grid item xs={2}>
          <Paper className={classes.progress}>

          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper} style={{ marginBottom: '0.5em' }}>
            <Typography variant="subtitle2">Level: {rank.title}</Typography>
          </Paper>
          <Paper className={classes.activity} style={{ display: 'flex', marginBottom: '0.5em' }}>
            <Typography className={classes.activityText} variant="subtitle2">
              {skill.activity}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography className={classes.activityText} variant="subtitle2">
              {3} Days ago
            </Typography>
          </Paper>
          <Paper className={classes.paper}> 
            <Typography variant="subtitle2">Last Action</Typography>
            <Divider style={{ marginBottom: '0.2em', marginTop: '0.2em' }} />
            <Typography variant="subtitle2">Coming Soon</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Paper className={classes.paper}> 
        <Button className={classes.button} variant="outlined" color="primary" endIcon={<UpdateIcon />} onClick={(e) => {e.stopPropagation()}}>
          Practice
        </Button>
      </Paper>
    </Paper>
  );
}

export default SkillCategoryThumbnail;