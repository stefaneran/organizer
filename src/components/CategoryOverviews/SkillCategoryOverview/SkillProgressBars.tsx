import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { VerticalProgressBar } from '@components/ProgressBar';
import { TOTAL_HOURS_TO_MASTERY } from '@logic/skill.constants';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%'
  },
  barContainer: {
    height: '100%',
    position: 'relative'
  },
  barLabel: {
    position: 'absolute',
    top: '0.5em',
    left: '50%',
    transform: 'translateX(-50%)'
  }
}));

const SkillProgressBars = ({ skill, rank }) => {
  const classes = useStyles();

  const currentHours = skill.totalHours;
  const maxHours = TOTAL_HOURS_TO_MASTERY;
  const hoursTooltip = `${Math.floor(currentHours)} / ${maxHours} Hours Total`;

  const currentXP = Math.abs(skill.totalXP - rank.min);
  const maxXP = rank.max - rank.min;
  const xpTooltip = `${currentXP} / ${rank.max} XP`;

  return (
    <Grid data-selector="progress-bars" container className={classes.container}>
      <Grid data-selector="progress-bar-hours" item xs={6} className={classes.barContainer}>
        <VerticalProgressBar 
          current={currentHours} 
          max={maxHours} 
          tooltip={{
            text: hoursTooltip,
            placement: 'right'
          }}
        />
        <Typography variant="subtitle1" className={classes.barLabel}>
          Hours
        </Typography>
      </Grid>
      <Grid data-selector="progress-bar-xp" item xs={6} className={classes.barContainer}>
        <VerticalProgressBar 
          current={currentXP} 
          max={maxXP} 
          tooltip={{
            text: xpTooltip,
            placement: 'right'
          }}
        />
        <Typography variant="subtitle1" className={classes.barLabel}>
          XP
        </Typography>
      </Grid>
    </Grid>
  )
}

export default SkillProgressBars;