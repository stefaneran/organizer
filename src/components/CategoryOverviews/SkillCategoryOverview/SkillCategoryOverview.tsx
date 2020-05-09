import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';
// Overview components
import SkillProgressBars from './SkillProgressBars';
import SkillGeneralInfo from './SkillGeneralInfo';
import SkillNotes from './SkillNotes';
import SkillStats from './SkillStats';
import ItemList from './ItemList';
// Dialogs
import UpdateSkillHoursDialog from '@components/Dialogs/UpdateSkillHoursDialog';
import UpdateSkillWeeklyGoalDialog from '@components/Dialogs/UpdateSkillWeeklyGoalDialog';
import ChooseSkillItemTypeDialog from '@components/Dialogs/ChooseSkillItemTypeDialog';
import CreateSkillItemDialog from '@components/Dialogs/CreateSkillItemDialog';
import UpdateSkillBookDialog from '@components/Dialogs/UpdateSkillBookDialog';
import UpdateSkillCourseDialog from '@components/Dialogs/UpdateSkillCourseDialog';
// Other 
import { getRankByXP, getNextRank } from '@logic/skill.logic';
import { CategoryType } from '@interfaces/categories';
import { SkillItemType } from '@interfaces/categories/skill/Skill.interface';

const { useState } = React;

const useStyles = makeStyles(theme => ({
  innerContainer: {
    height: '100%',
    maxWidth: 'none'
  },
  properties: {
    width: '100%'
  }
}));

const SkillCategoryOverview = ({ store, skill }) => {
  const classes = useStyles();

  // Selected data states
  const [currentItemType, setCurrentItemType] = useState(null);
  const [currentBook, setCurrentBook] = useState(null);
  const [currentCourse, setCurrentCourse] = useState(null);

  // Dialog open states
  const [chooseItemTypeDialogOpen, setChooseItemTypeDialogOpen] = useState(false);
  const [updateHoursDialogOpen, setUpdateHoursDialogOpen] = useState(false);
  const [updateGoalDialogOpen, setUpdateGoalDialogOpen] = useState(false);

  const rank = getRankByXP(skill.totalXP) || { title: "Error: No Rank"};
  const nextRank = getNextRank(rank) || { title: "Error: No Rank" };

  const dialogActions = {
    open: ({ type, data }: { type: string; data? }) => () => {
      const map = {
        updateHours: setUpdateHoursDialogOpen,
        updateGoal: setUpdateGoalDialogOpen,
        chooseItemType: setChooseItemTypeDialogOpen,
        updateBook: setCurrentBook,
        updateCourse: setCurrentCourse
      }
      map[type](data || true);
    },
    close: {
      // Hours practiced dialog
      hours: ({ isSubmit, hoursValue }) => {
        setUpdateHoursDialogOpen(false);
        if(isSubmit) {
          const { updateSkillHours, saveData } = store;
          updateSkillHours({ 
            title: skill.title, 
            hoursValue 
          });
          saveData();
        }
      },
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
    const { deleteCategory, saveData } = store;
    deleteCategory({ 
      categoryType: CategoryType.Skill, 
      title: skill.title 
    });
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
            <Paper style={{ height: '100%', padding: '0.5em' }}>
              <Typography variant="subtitle1">Next level: {nextRank.title}</Typography>
            </Paper>
          </Grid>

        </Grid>
        <Grid xs={9} container item spacing={1} direction="column">

          <Grid className={clsx(classes.properties, 'gridRow')} xs={5} style={{ maxHeight: '42%' }} container item direction="column">
            <SkillGeneralInfo skill={skill} rank={rank} dialogActions={dialogActions} onDelete={handleDeleteSkill} />
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
        <ItemList 
          items={skill.items} 
          archive={skill.archive} 
          openDialog={dialogActions.open}
        />
      </Grid>
    
      {/* Dialogs only below this line */}

      {updateHoursDialogOpen && (
        <UpdateSkillHoursDialog isOpen={updateHoursDialogOpen} onClose={dialogActions.close.hours} />
      )}
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

export default SkillCategoryOverview;