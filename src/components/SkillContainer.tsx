import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Paper, Button } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import ContentToolbar, { exportedStyles } from '@components/ContentToolbar';
import SkillList from '@components/SkillList';
import SkillView from '@components/SkillView';
import UpdateSkillHoursDialog from '@components/Dialogs/UpdateSkillHoursDialog';
import CreateSkillWizard from '@components/Wizards/CreateSkillWizard';
import { getSkillByTitle } from '@store/accessors';

const { useState, useEffect } = React;

const useStyles = makeStyles((theme: Theme) => createStyles({
  ...exportedStyles
}));

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
      {currentSkill ? (
        <>
          <Grid item xs={1} className={'gridRow'}>
            <Paper style={{ padding: '0.5em' }}>
              <Button variant="outlined" color="primary" onClick={() => setCurrentSkill(null)}>
                Back
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={11} className={'gridRow'}>
            <SkillView store={store} skill={currentSkill} globalDialogActions={globalDialogActions} />
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={1} className={'gridRow'}>
            <ContentToolbar 
              store={store} 
              toolBarHandlers={skillToolBarHandlers}
              specializedButtons={(
                <Grid item className={classes.buttonContainer}>
                  <Button 
                    className={classes.button} 
                    onClick={() => setCreateSkillDialogOpen(true)}
                    endIcon={<AddIcon className={classes.buttonIcon} style={{ height: '1.5em', color: '#fff' }} />}
                  >
                    Add Skill
                  </Button>
                </Grid>
              )} 
            />
          </Grid>
          <Grid item xs={11} className={'gridRow'}>
            <SkillList
              skills={skills} 
              onThumbClick={handleSkillThumbClick}
              globalDialogActions={globalDialogActions}
            />
          </Grid>
        </>
      )}
      
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