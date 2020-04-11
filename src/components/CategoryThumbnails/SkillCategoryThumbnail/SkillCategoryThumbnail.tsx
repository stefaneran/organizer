import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import { ISkillCategory } from '@interfaces/categories/skill/Skill.interface';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    padding: '0.5em',
    textDecoration: 'none'
  },
  innerContainer: {
    height: '100%'
  },
  topSection: {

  },
  bottomSection: {

  },
  title: {
    padding: '0.2em',
    marginBottom: '0.5em'
  },
  description: {
    padding: '0.2em'
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
    border: '1px solid black'
  }
}));

const SkillCategoryThumbnail = (skill: ISkillCategory) => {
  const classes = useStyles();
  const { title, description, priority, items, totalHours, totalXP } = skill;

  return (
    <Paper className={classes.container}>
      <Grid container direction="column" justify="space-between" className={classes.innerContainer}>

        <Grid item container direction="column" xs className={classes.topSection}>
          <Grid className={clsx(classes.title, "gridRow")} item xs={2}>
            <p>{title}</p>
          </Grid>
          <Grid className={clsx(classes.description, "gridRow")} item xs={2}>
            <p>{description}</p>
          </Grid>
          <Grid className={'gridRow'} item container xs>
            <ul className={classes.itemList}>
              {items && items.map(item => (
                <ul>{item.title}</ul>
              ))}
            </ul>
          </Grid>
        </Grid>

        <Grid item container direction="column" xs={3} className={clsx(classes.bottomSection, 'gridRow')}>
          <Grid item className={clsx(classes.hourBar, 'gridRow')} xs={6}>
            {totalHours}
          </Grid>
          <Grid item className={clsx(classes.xpBar, 'gridRow')} xs={6}>
            {totalXP}
          </Grid>
        </Grid>

      </Grid>
    </Paper>
  );
}

export default SkillCategoryThumbnail;