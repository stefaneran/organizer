import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import { ISkillCategory } from '@interfaces/categories/skill/Skill.interface';

const useStyles = makeStyles(theme => ({
  thumbContainer: {
    height: '100%',
    padding: '0.5em',
    textDecoration: 'none'
  },
  fullWidth: {
    maxWidth: 'none'
  },
  sectionContainer: {
    
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
    marginBottom: '0.3em',
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
    <Paper className={classes.thumbContainer}>
      <Grid container direction="column" justify="space-between" className={classes.sectionContainer}>

        <Grid item container direction="column" xs className={classes.topSection}>
          <Grid item xs={2} className={clsx(classes.title, classes.fullWidth)}>
            <p>{title}</p>
          </Grid>
          <Grid item xs={2} className={clsx(classes.description, classes.fullWidth)}>
            <p>{description}</p>
          </Grid>
          <Grid item container xs>
            <ul className={classes.itemList}>
              {items && items.map(item => (
                <ul>{item.title}</ul>
              ))}
            </ul>
          </Grid>
        </Grid>

        <Grid item container direction="column" xs={3} className={clsx(classes.bottomSection, classes.fullWidth)}>
          <Grid item className={clsx(classes.hourBar, classes.fullWidth)} xs={6}>
            {totalHours}
          </Grid>
          <Grid item className={clsx(classes.xpBar, classes.fullWidth)} xs={6}>
            {totalXP}
          </Grid>
        </Grid>

      </Grid>
    </Paper>
  );
}

export default SkillCategoryThumbnail;