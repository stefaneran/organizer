import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';
// Overview components
import SkillProgressBars from '../SkillProgressBars';
import SkillGeneralInfo from '../SkillGeneralInfo';
import SkillNotes from '../SkillNotes';
import SkillStats from '../SkillStats';
import SkillItemList from '../SkillItemList';
// Other 
import { getRankByXP, getNextRank } from '@skills/utils/general';

const useStyles = makeStyles((theme: Theme) => createStyles({
  innerContainer: {
    height: '100%',
    maxWidth: 'none'
  },
  properties: {
    width: '100%'
  },
  progressInfo: {
    backgroundColor: theme.palette.primary.main,
    padding: '0.3em',
    height: '100%'
  }
}));

const SkillView = ({ 
  skill, 
  onOpenDialog, 
  onEditSave, 
  onDeleteSkill, 
  setSelectedItem
}) => {
  const classes = useStyles();

  const rank = getRankByXP(skill.totalXP) || { title: "Error: No Rank"};
  const nextRank = getNextRank(rank) || { title: "Error: No Rank" };

  return (
    <Grid className={classes.innerContainer} container item spacing={1} xs={11}>
      <Grid container item xs={8} spacing={1}>
        <Grid container item xs={3} spacing={1} direction="column">
          
          <Grid className={'gridRow'} item xs={10}>
            <SkillProgressBars skill={skill} rank={rank} />
          </Grid>

          <Grid className={'gridRow'} item xs={2}>
            <Paper className={classes.progressInfo}>
              <Paper style={{ height: '100%', padding: '0.3em' }}>
                <Typography variant="subtitle1">Next level: {nextRank.title}</Typography>
              </Paper>
            </Paper>
          </Grid>

        </Grid>
        <Grid xs={9} container item spacing={1} direction="column">

          <Grid className={clsx(classes.properties, 'gridRow')} xs={5} style={{ maxHeight: '42%' }} container item direction="column">
            <SkillGeneralInfo 
              skill={skill} 
              rank={rank} 
              onOpenDialog={onOpenDialog}
              onDelete={onDeleteSkill}
            />
          </Grid>
          
          <Grid className={'gridRow'} xs={5} style={{ maxHeight: '42%' }} container item direction="column">
            <SkillNotes notes={skill.notes} onEditSave={onEditSave} />
          </Grid>

          <Grid className={'gridRow'} xs={2} container item>
            <SkillStats />
          </Grid>

        </Grid>
      </Grid>
      <Grid item xs={4}>
        <SkillItemList 
          skill={skill}
          onOpenDialog={onOpenDialog}
          setSelectedItem={setSelectedItem}
        />
      </Grid>
    </Grid>
  )
}

export default SkillView;