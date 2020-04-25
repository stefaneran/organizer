import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';
import { ISkillCategory } from '@interfaces/categories/skill/Skill.interface';
import { getRankByXP } from '@logic/skill.logic';
import { TOTAL_HOURS_TO_MASTERY } from '@logic/skill.constants';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    padding: '0.5em',
    textDecoration: 'none !important',
    cursor: 'pointer'
  },
  innerContainer: {
    height: '100%'
  },
  section: {
    width: '100%',
    padding: '0.5em'
  },
  hourBar: {
    padding: '0.2em',
    border: '1px solid black'
  },
  xpBar: {
    padding: '0.2em',
    border: '1px solid black'
  },
  itemList: {
    width: '100%',
    height: '100%',
    padding: '1em',
    border: '1px solid black',
    borderRadius: '3px',
    overflowY: 'auto',
    overflowX: 'hidden',
    listStyle: 'none',
    '& li': {
      marginBottom: '1em'
    }
  }
}));

const SkillCategoryThumbnail = (skill: ISkillCategory) => {
  const classes = useStyles();
  const { title, items, totalHours, totalXP } = skill;
  const rank = getRankByXP(totalXP);

  return (
    <Paper className={classes.container}>
      <Grid container direction="column" spacing={1} className={classes.innerContainer}>

        <Grid item container direction="column" xs spacing={1}>
          <Grid className={"gridRow"} item xs={3}>
            <Paper className={classes.section}>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography>{title}</Typography>
                </Grid>
                <Grid item>
                  <Typography>-</Typography>
                </Grid>
                <Grid item>
                  <Typography>{rank.title}</Typography>
                </Grid>
                <Grid item>
                  <Typography>-</Typography>
                </Grid>
                <Grid item>
                  <Typography>{skill.activity}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid className={'gridRow'} item container xs>
            <Paper className={classes.section}>
              <ul className={classes.itemList}>
                {items && items.map(item => (
                  <li key={item.title}>
                    <Typography variant="subtitle2">{item.title}</Typography>
                  </li>
                ))}
              </ul>
            </Paper>
          </Grid>
        </Grid>

        <Grid item container direction="column" xs={3} className={'gridRow'}>
          <Grid item className={clsx(classes.hourBar, 'gridRow')} xs={6}>
            <Typography variant="subtitle2">{`${totalHours}/${TOTAL_HOURS_TO_MASTERY}`}</Typography>
          </Grid>
          <Grid item className={clsx(classes.xpBar, 'gridRow')} xs={6}>
          <Typography variant="subtitle2">{`${totalXP}/${rank.max}`}</Typography>
          </Grid>
        </Grid>

      </Grid>
    </Paper>
  );
}

export default SkillCategoryThumbnail;