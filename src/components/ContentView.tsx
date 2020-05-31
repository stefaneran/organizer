import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button } from '@material-ui/core';
import ContentToolbar from '@components/ContentToolbar';
import SkillList from '@components/SkillList';
import { SkillView } from '@components/SkillView';
import UpdateSkillHoursDialog from '@components/Dialogs/UpdateSkillHoursDialog';
import CreateSkillWizard from '@components/Wizards/CreateSkillWizard';
import { getSkillByTitle } from '@store/accessors';

const { useState, useEffect } = React;

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    '& > div': {
      height: '100%',
      width: '100%',
      padding: '0.5em'
    }
  },
  innerContainer: {
    height: '100%'
  }
})); 

const ContentView = ({ store }) => {
  const classes = useStyles();

  const { addSkill, saveData } = store;
  const { skills, contacts } = store.data;

  // "Skills" or "Contacts"
  const [currentCategory, setCurrentCategory] = useState(null);
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
  }, [store])

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
          const { updateSkillHours, saveData } = store;
          updateSkillHours({ 
            title: updateHoursDialog.title, 
            hoursValue 
          });
          saveData();
        }
      }
    }
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
      addSkill({ formData });
      saveData();
    }
    setCreateSkillDialogOpen(false);
  }

  const toolBarHandlers = {
    openCreateSkillWizard: () => setCreateSkillDialogOpen(true)
  }

  return (
    <div className={classes.container}>
      <Grid className={classes.innerContainer} container direction="column">
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
              <ContentToolbar store={store} toolBarHandlers={toolBarHandlers} />
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

    </div>
  );
}

export default ContentView;