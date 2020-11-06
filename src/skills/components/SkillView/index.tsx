import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';
// Overview components
import SkillProgressBars from './SkillProgressBars';
import SkillGeneralInfo from './SkillGeneralInfo';
import SkillNotes from './SkillNotes';
import SkillStats from './SkillStats';
import SkillItemList from './SkillItemList';
// Dialogs
import UpdateSkillWeeklyGoalDialog from '@skills/components/dialogs/UpdateSkillWeeklyGoalDialog';
import ChooseSkillItemTypeDialog from '@skills/components/dialogs/ChooseSkillItemTypeDialog';
import CreateSkillItemDialog from '@skills/components/dialogs/CreateSkillItemDialog';
import UpdateSkillBookDialog from '@skills/components/dialogs/UpdateSkillBookDialog';
import UpdateSkillCourseDialog from '@skills/components/dialogs/UpdateSkillCourseDialog';
// Other 
import { getRankByXP, getNextRank } from '@skills/utils';

const { useState } = React;

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

const SkillView = ({ store, skill, globalDialogActions }) => {
  const classes = useStyles();

  // Selected data states
  const [currentItemType, setCurrentItemType] = useState(null);
  const [currentBook, setCurrentBook] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);

  // Dialog open states
  const [chooseItemTypeDialogOpen, setChooseItemTypeDialogOpen] = useState(false);
  
  const [updateGoalDialogOpen, setUpdateGoalDialogOpen] = useState(false);

  const rank = getRankByXP(skill.totalXP) || { title: "Error: No Rank"};
  const nextRank = getNextRank(rank) || { title: "Error: No Rank" };

  const dialogActions = {
    open: ({ type, data }: { type: string; data? }) => () => {
      const map = {
        updateGoal: setUpdateGoalDialogOpen,
        chooseItemType: setChooseItemTypeDialogOpen,
        updateBook: setCurrentBook,
        updateCourse: setCurrentCourse
      }
      map[type](data || true);
    },
    close: {
      // Change week goal dialog
      goal: ({ isSubmit, weeklyGoal }) => {
        setUpdateGoalDialogOpen(false);
        if(isSubmit) {
          const { updateWeeklyGoal, saveData } = store;
          updateWeeklyGoal({ 
            title: skill.title, 
            weeklyGoal
          });
          saveData();
        }
      },
      // Choose item type on creation dialog
      chooseItemType: ({ itemType }) => {
        setCurrentItemType(itemType);
        setChooseItemTypeDialogOpen(false);
      },
      // Create item wizard dialog
      createItem: ({ isSubmit, formData }) => {
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
      },
      // Update book dialog
      book: ({ isSubmit, pagesValue }) => {
        const { updateSkillBook, saveData } = store;
        if(isSubmit) {
          updateSkillBook({
            skillTitle: skill.title,
            itemTitle: currentBook.title,
            pagesValue
          });
          saveData();
        }
        setCurrentBook(null);
      },
      // Update course dialog
      course: ({ isSubmit, classesValue }) => {
        const { updateSkillCourse, saveData } = store;
        if(isSubmit) {
          updateSkillCourse({
            skillTitle: skill.title,
            itemTitle: currentCourse.title,
            classesValue
          });
          saveData();
        }
        setCurrentCourse(null);
      }
    }
  }

  const handleDeleteSkill = () => {
    // TODO - Add confirmation dialog
    const { deleteSkill, saveData } = store;
    deleteSkill({ title: skill.title });
    saveData();
  }

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
              dialogActions={dialogActions} 
              globalDialogActions={globalDialogActions} 
              onDelete={handleDeleteSkill}
            />
          </Grid>
          
          <Grid className={'gridRow'} xs={5} style={{ maxHeight: '42%' }} container item direction="column">
            <SkillNotes store={store} title={skill.title} notes={skill.notes} />
          </Grid>

          <Grid className={'gridRow'} xs={2} container item>
            <SkillStats />
          </Grid>

        </Grid>
      </Grid>
      <Grid item xs={4}>
        <SkillItemList 
          items={skill.items} 
          archive={skill.archive} 
          openDialog={dialogActions.open}
        />
      </Grid>
    
      {/* Dialogs only below this line */}

      
      {updateGoalDialogOpen && (
        <UpdateSkillWeeklyGoalDialog isOpen={updateGoalDialogOpen} onClose={dialogActions.close.goal} />
      )}

      <ChooseSkillItemTypeDialog isOpen={chooseItemTypeDialogOpen} onClose={dialogActions.close.chooseItemType} />
      {currentItemType && (
        <CreateSkillItemDialog isOpen={Boolean(currentItemType)} onClose={dialogActions.close.createItem} itemType={currentItemType} />
      )}

      {currentBook && (
        <UpdateSkillBookDialog isOpen={Boolean(currentBook)} book={currentBook} onClose={dialogActions.close.book} />
      )}
      {currentCourse && (
        <UpdateSkillCourseDialog isOpen={Boolean(currentCourse)} course={currentCourse} onClose={dialogActions.close.course} />
      )}
    </Grid>
  )
}

export default SkillView;