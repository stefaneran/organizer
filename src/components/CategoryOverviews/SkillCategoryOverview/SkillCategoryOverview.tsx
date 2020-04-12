import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';
// Overview components
import ProgressBars from './ProgressBars';
import GeneralInfo from './GeneralInfo';
import TopActivity from './TopActivity';
import Actions from './Actions';
import ItemList from './ItemList';
// Dialogs
import AddSkillHoursDialog from '@components/Dialogs/AddSkillHoursDialog';
import ChooseSkillItemTypeDialog from '@components/Dialogs/ChooseSkillItemTypeDialog';
import CreateSkillItemDialog from '@components/Dialogs/CreateSkillItemDialog';
// Other 
import { getRankByXP, getNextRank } from '@logic/skill.logic';
import { CategoryType } from '@interfaces/categories';

const { useState } = React;

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%'
  },
  innerContainer: {
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
  const [chooseItemTypeDialogOpen, setChooseItemTypeDialogOpen] = useState(false);
  const [currentItemType, setCurrentItemType] = useState(null);

  // const skill = skillMock;
  const rank = getRankByXP(skill.totalXP) || { title: "Error: No Rank"};
  const nextRank = getNextRank(rank) || { title: "Error: No Rank" };

  console.log('DEV Skill Items ', skill.items)

  const openDialog = ({ type }) => () => {
    const map = {
      addHours: setAddHoursDialogOpen,
      chooseItemType: setChooseItemTypeDialogOpen
    }
    map[type](true);
  }

  const handleDeleteSkill = () => {
    // TODO - Add confirmation dialog
    const { deleteCategory, saveData } = store;
    deleteCategory({ 
      categoryType: CategoryType.Skill, 
      title: skill.title 
    });
    saveData();
  }

  const handleCloseHoursDialog = ({ isSubmit, hoursValue }) => {
    setAddHoursDialogOpen(false);
    if(isSubmit) {
      const { addHoursToSkill, saveData } = store;
      addHoursToSkill({ 
        title: skill.title, 
        hoursValue 
      });
      saveData();
    }
  }

  const handleCloseChooseItemDialog = ({ itemType }) => {
    setCurrentItemType(itemType);
    setChooseItemTypeDialogOpen(false);
  }

  const handleCloseCreateItemDialog = ({ isSubmit, formData }) => {
    const { addSkillItem, saveData } = store;
    if(isSubmit) {
      addSkillItem({ 
        title: skill.title, 
        itemType: currentItemType, 
        formData 
      });
      saveData();
    }
    setCurrentItemType(null);
  }

  return (
    <Paper className={classes.container}>
      <Grid className={classes.innerContainer} container item spacing={2} xs={11}>
        <Grid container item xs={8} spacing={2}>
          <Grid container item xs={3} spacing={2} direction="column">
            
            <Grid className={'gridRow'} item xs={10}>
              <ProgressBars />
            </Grid>

            <Grid className={'gridRow'} item xs={2}>
              <Paper style={{ height: '100%', padding: '0.5em' }}>
                <Typography variant="subtitle1">Next level: {nextRank.title}</Typography>
              </Paper>
            </Grid>

          </Grid>
          <Grid xs={9} container item spacing={2} direction="column">

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
        <Grid item xs={4}>
          <ItemList 
            items={skill.items} 
            archive={skill.archive} 
            openDialog={openDialog}
          />
        </Grid>
      </Grid>

      {/* Dialogs only below this line */}

      <AddSkillHoursDialog isOpen={addHoursDialogOpen} onClose={handleCloseHoursDialog} />

      <ChooseSkillItemTypeDialog isOpen={chooseItemTypeDialogOpen} onClose={handleCloseChooseItemDialog} />
      {currentItemType && (
        <CreateSkillItemDialog isOpen={Boolean(currentItemType)} onClose={handleCloseCreateItemDialog} itemType={currentItemType} />
      )}
      

    </Paper>
  )
}

export default SkillCategoryOverview;