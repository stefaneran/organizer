import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';
import ProgressBars from './ProgressBars';
import GeneralInfo from './GeneralInfo';
import TopActivity from './TopActivity';
import Actions from './Actions';
import AddSkillHoursDialog from '@components/Dialogs/AddSkillHoursDialog';
import { getRankByXP, getNextRank } from '@logic/skill.logic';
import skillMock from '@mocks/skill.mock';
import { CategoryType } from '@interfaces/categories';

const { useState } = React;

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%'
  },
  containerInner: {
    height: '100%',
    padding: '1em',
    maxWidth: 'none'
  },
  properties: {
    width: '100%'
  }
}));

const SkillCategoryOverview = ({ store, skill }) => {
  const classes = useStyles();

  const [addHoursDialogOpen, setAddHoursDialogOpen] = useState(false);

  // const skill = skillMock;
  const rank = getRankByXP(skill.totalXP) || { title: "Error: No Rank"};
  const nextRank = getNextRank(rank) || { title: "Error: No Rank" };

  const openDialog = ({ type }) => () => {
    const map = {
      addHours: setAddHoursDialogOpen
    }
    map[type](true);
  }

  const handleDeleteSkill = () => {
    // TODO - Add confirmation dialog
    const { deleteCategoryThunk, saveDataThunk } = store;
    deleteCategoryThunk({ 
      categoryType: CategoryType.Skill, 
      title: skill.title 
    });
    saveDataThunk();
  }

  const handleCloseHoursDialog = ({ isSubmit, hoursValue }) => {
    setAddHoursDialogOpen(false);
    if(isSubmit) {
      const { addHoursToSkillThunk, saveDataThunk } = store;
      addHoursToSkillThunk({ 
        title: skill.title, 
        hoursValue 
      });
      saveDataThunk();
    }
  }

  return (
    <Paper className={classes.container}>
      <Grid className={classes.containerInner} container item spacing={2} xs={11}>
        <Grid data-selector="overview" xs={8} container item spacing={2}>
          <Grid data-selector="progression" xs={3} container item spacing={2} direction="column">
            
            <Grid className={'gridRow'} item xs={10}>
              <ProgressBars />
            </Grid>

            <Grid className={'gridRow'} item xs={2}>
              <Paper style={{ height: '100%', padding: '0.5em' }}>
                <Typography variant="subtitle1">Next level: {nextRank.title}</Typography>
              </Paper>
            </Grid>

          </Grid>
          <Grid data-selector="info" xs={9} container item spacing={2} direction="column">

            <Grid className={clsx(classes.properties, 'gridRow')} xs={5} container item direction="column">
              <GeneralInfo title={skill.title} rank={rank} lastActivity={skill.lastActivity}  />
            </Grid>
            
            <Grid className={'gridRow'} xs={5} container item direction="column">
              <TopActivity />
            </Grid>

            <Grid className={'gridRow'} xs={2} container item>
              <Actions openDialog={openDialog} onDelete={handleDeleteSkill} />
            </Grid>

          </Grid>
        </Grid>
        <Grid data-selector="skill-items" xs={4} container item>

        </Grid>
      </Grid>

      {/* Dialogs only below this line */}

      <AddSkillHoursDialog isOpen={addHoursDialogOpen} onClose={handleCloseHoursDialog} />

    </Paper>
  )
}

export default SkillCategoryOverview;