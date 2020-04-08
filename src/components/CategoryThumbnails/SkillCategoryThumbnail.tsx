import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import { ISkillCategory } from '@interfaces/categories/skill/Skill.interface';

const useStyles = makeStyles(theme => ({
  thumbContainer: {
    height: '100%',
    // width: '100%'
  },
  leftSection: {
    height: '100%',
    // width: '40%',
    border: '1px solid black'
  },
  rightSection: {
    height: '100%',
    // width: '60%',
    border: '1px solid black'
  },
  hourBar: {
    height: '100%',
    // width: '40%',
    border: '1px solid black'
  },
  xpBar: {
    height: '100%',
    // width: '40%',
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
    <Paper>
      <Grid container direction="row">
        <Grid item container direction="row" xs={3} className={classes.leftSection}>
          <Grid item className={classes.hourBar} xs={6}>
            {totalHours}
          </Grid>
          <Grid item className={classes.xpBar} xs={6}>
            {totalXP}
          </Grid>
        </Grid>
        <Grid item container direction="column" xs className={classes.rightSection}>
          <Grid item>{title}</Grid>
          <Grid item>{description}</Grid>
          <Grid item container>
            <ul className={classes.itemList}>
              {items && items.map(item => (
                <ul>{item.title}</ul>
              ))}
            </ul>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SkillCategoryThumbnail;