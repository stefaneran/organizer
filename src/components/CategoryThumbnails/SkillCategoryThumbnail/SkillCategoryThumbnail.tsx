import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Divider, Button } from '@material-ui/core';
import UpdateIcon from '@material-ui/icons/Update';
import { VerticalProgressBar } from '@components/ProgressBar';
import { getRankByXP } from '@logic/skill.logic';
import { getWeekHourGoalProgress, getDaysFromDate } from '@utils/dateUtils';
import formatHourValue from '@utils/formatHourValue';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    padding: '0.5em',
    cursor: 'pointer',
    transition: 'background-color 300ms',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    }
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
  }
}));

const SkillCategoryThumbnail = ({ skill, globalDialogActions }) => {
  const classes = useStyles();

  const { title, totalXP, weekHourGoal, lastActivity } = skill;

  const rank = getRankByXP(totalXP);
  const weekProgress = getWeekHourGoalProgress(skill);
  const daysSinceLastActivity = getDaysFromDate(lastActivity);

  return (
    <Paper className={classes.container}>

      <Paper className={clsx(classes.paper, classes.title)}>
        <Typography variant="subtitle1">{title}</Typography>
      </Paper>

      <Grid container spacing={1} style={{ marginBottom: '0.2em' }}> 
        <Grid item xs={2}>
          <VerticalProgressBar 
            current={weekProgress} 
            max={weekHourGoal} 
            tooltip={{ text: `${formatHourValue(weekProgress)} hours out of ${formatHourValue(weekHourGoal)}`, placement: 'right'}}
          />
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
              {daysSinceLastActivity > 0 ? `${daysSinceLastActivity} Days ago` : `Today`}
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
        <Button 
          className={classes.button} 
          variant="outlined" 
          color="primary" 
          endIcon={<UpdateIcon />} 
          onClick={(e) => {
            e.stopPropagation();
            globalDialogActions.open({ type: 'updateHours', data: skill.title })();
          }}
        >
          Practice
        </Button>
      </Paper>
    </Paper>
  );
}

export default SkillCategoryThumbnail;