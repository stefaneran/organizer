import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { default as ArrowIcon } from '@material-ui/icons/ArrowBackIos';
import ContentToolbar, { exportedStyles } from '@components/ContentToolbar';
import SkillList from '@components/SkillList';
import SkillView from '@components/SkillView';
import UpdateSkillHoursDialog from '@components/Dialogs/UpdateSkillHoursDialog';
import CreateSkillWizard from '@components/Wizards/CreateSkillWizard';
import { getSkillByTitle } from '@store/accessors';

const { useState, useEffect } = React;

const useStyles = makeStyles((theme: Theme) => createStyles(exportedStyles));

const SkillContainer = ({ store, toolBarHandlers }) => {
  const classes = useStyles();
  const { data: { skills } } = store;

  // Skill selected (Entire skill data)
  const [currentSkill, setCurrentSkill] = useState(null);

  // Dialog data
  const [isCreateSkillDialogOpen, setCreateSkillDialogOpen] = useState(false);
  const [updateHoursDialog, setUpdateHoursDialog] = useState({
    isOpen: false,
    title: null
  });

  // Update skill state when store changes
  useEffect(() => {
    if(currentSkill) {
      const title = currentSkill.title;
      if(!title) return;
      const skillData = getSkillByTitle(skills, title);
      setCurrentSkill(skillData);
    }
  }, [skills])

  const globalDialogActions = {
    open: ({ type, data }: { type: string; data? }) => () => {
      const map = {
        updateHours: () => setUpdateHoursDialog({ isOpen: true, title: data })
      }
      map[type](data || true);
    },
    close: {
      hours: ({ isSubmit, hoursValue }) => {
        setUpdateHoursDialog({ isOpen: false, title: null });
        if(isSubmit) {
          store.updateSkillHours({ 
            title: updateHoursDialog.title, 
            hoursValue 
          });
          store.saveData();
        }
      }
    }
  }

  const skillToolBarHandlers = {
    ...toolBarHandlers,
    openCreateSkillWizard: () => setCreateSkillDialogOpen(true)
  }

  const handleSkillThumbClick = (skillData?) => () => {
    if(skillData) {
      setCurrentSkill(skillData);
    } else {
      setCreateSkillDialogOpen(true);
    }
  }
  
  const handleCloseCreateSkillWizard = ({ isSubmit, formData }) => {
    if(isSubmit) {
      store.addSkill({ formData });
      store.saveData();
    }
    setCreateSkillDialogOpen(false);
  }

  return (
    <>
      <ContentToolbar 
        store={store} 
        toolBarHandlers={skillToolBarHandlers}
        specializedButtons={currentSkill ? (
          <Grid item className={classes.buttonContainer}>
            <Button 
              className={clsx(classes.button, classes.textButton)}
              onClick={() => setCurrentSkill(null)}
              startIcon={<ArrowIcon className={classes.buttonIcon} />}
            >
              Back
            </Button>
          </Grid>
        ) : (
          <Grid item className={classes.buttonContainer}>
            <Button 
              className={clsx(classes.button, classes.textButton)} 
              onClick={() => setCreateSkillDialogOpen(true)}
              endIcon={<AddIcon className={classes.buttonIcon} />}
            >
              Add Skill
            </Button>
          </Grid>
        )}
      />
      <Grid item xs={11} className={'gridRow'} style={{ paddingTop: '0.5em' }}>
        {currentSkill ? (
          <SkillView store={store} skill={currentSkill} globalDialogActions={globalDialogActions} />
        ) : (
          <SkillList
            skills={skills} 
            onThumbClick={handleSkillThumbClick}
            globalDialogActions={globalDialogActions}
          />
        )}
      </Grid>
      
      {/* Dialogs and Pop-Ups below this line  */}

      {isCreateSkillDialogOpen && (
        <CreateSkillWizard 
          isOpen={isCreateSkillDialogOpen} 
          onClose={handleCloseCreateSkillWizard}
        />
      )}

      {updateHoursDialog.isOpen && (
        <UpdateSkillHoursDialog isOpen={updateHoursDialog.isOpen} onClose={globalDialogActions.close.hours} />
      )}
    </>
  );
}

export default SkillContainer;