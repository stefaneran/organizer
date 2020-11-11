import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import HistoryView from '@skills/components/HistoryView';
import SkillList from '@skills/components/SkillList';
import SkillView from '@skills/components/SkillView';
import SkillDialogs from '@skills/components/dialogs';
import DialogTypes from '@skills/interfaces/DialogTypes.interface';

const useStyles = makeStyles((theme: Theme) => createStyles({
  contentContainer: {
    height: '93%',
    overflowX: 'hidden',
    overflowY: 'auto'
  }
}));

const SkillsContainer = ({ skills, ...actions }) => {
  const classes = useStyles();

  // string ID of selected skill
  const [selectedSkill, setSelectedSkill] = React.useState(undefined);
  // object of selected item
  const [selectedItem, setSelectedItem] = React.useState(undefined);
  // string type of selected item (or item about to be created)
  const [selectedItemType, setSelectedItemType] = React.useState(undefined);

  const [isSkillViewOpen, setIsSkillViewOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState('');

  const handleSkillThumbClick = (skillId?) => () => {
    // If clicked on a real skill thumbnail
    if(skillId) {
      setSelectedSkill(skillId);
      setIsSkillViewOpen(true);
    } 
    // Otherwise clicked on a mock thumbnail that displays when no skills present
    else {
      setOpenDialog(DialogTypes.CreateSkill);
    }
  }

  const handleEditSave = ({ property, value }) => {
    const { editSkill } = actions;
    editSkill({ 
      id: selectedSkill, 
      property, 
      value 
    });
  }

  const handleDeleteSkill = () => {
    // TODO - Add confirmation dialog
    const { deleteSkill } = actions;
    deleteSkill({ id: selectedSkill });
  }

  const handleOpenDialog = (type: DialogTypes, skillId?: string) => () => {
    setOpenDialog(type);
    // Exception: When opening the "Practice" dialog from skill thumbnail, we don't have skill id context so submit won't work otherwise
    if (skillId) {
      setSelectedSkill(skillId);
    }
  }

  const handleCloseDialog = ({ isSubmit, ...props }) => {
    if (openDialog === DialogTypes.CreateSkill && isSubmit) {
      const { createSkill } = actions;
      const { formData } = props;
      createSkill({ formData });
    }
    if (openDialog === DialogTypes.CreateSkillItem && isSubmit) {
      const { createSkillItem } = actions;
      const { formData } = props;
      createSkillItem({ 
        id: selectedSkill, 
        itemType: selectedItemType, 
        formData 
      });
    }
    if (openDialog === DialogTypes.UpdateHours && isSubmit) {
      const { updateSkillHours } = actions;
      const { hoursValue } = props;
      updateSkillHours({
        id: selectedSkill, 
        hoursValue
      });
    }
    if (openDialog === DialogTypes.UpdateGoal && isSubmit) {
      const { editSkill } = actions;
      const { weeklyGoal } = props;
      editSkill({ 
        id: selectedSkill, 
        property: 'weekHourGoal', 
        value: weeklyGoal 
      });
    }
    if (openDialog === DialogTypes.UpdateSkillBook && isSubmit) {
      const { updateSkillBook } = actions;
      const { pagesValue } = props;
      updateSkillBook({ 
        id: selectedSkill, 
        itemName: selectedItem.name, 
        pagesValue
      });
    }
    if (openDialog === DialogTypes.UpdateSkillCourse && isSubmit) {
      const { updateSkillCourse } = actions;
      const { classesValue } = props;
      updateSkillCourse({ 
        id: selectedSkill, 
        itemName: selectedItem.name, 
        classesValue
      });
    }
    // In this case we move on to another dialog so we return
    if (openDialog === DialogTypes.ChooseSkillItemType) {
      const { itemType } = props;
      setSelectedItemType(itemType);
      setOpenDialog(DialogTypes.CreateSkillItem);
      return;
    }
    setOpenDialog('');
  }

  return (
    <>
      <Grid item xs={11} className={`gridRow ${classes.contentContainer}`} style={{ paddingTop: '0.5em' }}>
        <Grid item xs={9} className="fullHeight">
          {isSkillViewOpen ? (
            <SkillView 
              skill={skills[selectedSkill]} 
              onOpenDialog={handleOpenDialog} 
              onEditSave={handleEditSave}
              onDeleteSkill={handleDeleteSkill}
              setSelectedItem={setSelectedItem}
            />
          ) : (
            <SkillList
              skills={skills} 
              onThumbClick={handleSkillThumbClick}
              onOpenDialog={handleOpenDialog}
            />
          )}
        </Grid>
        <Grid item xs={3} className="fullHeight">
          <HistoryView skills={skills} />
        </Grid>
      </Grid>
      
      <SkillDialogs 
        openDialog={openDialog}
        onClose={handleCloseDialog}
        selectedItem={selectedItem}
        selectedItemType={selectedItemType}
      />
    </>
  );
}

export default SkillsContainer;