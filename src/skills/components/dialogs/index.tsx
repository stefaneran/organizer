import * as React from 'react';
import DialogTypes from '@skills/interfaces/DialogTypes.interface';
import CreateSkillWizard from '@core/components/Wizards/CreateSkillWizard';
import UpdateSkillHoursDialog from './UpdateSkillHoursDialog';
import UpdateSkillWeeklyGoalDialog from './UpdateSkillWeeklyGoalDialog';
import ChooseSkillItemTypeDialog from './ChooseSkillItemTypeDialog';
import CreateSkillItemDialog from './CreateSkillItemDialog';
import UpdateSkillBookDialog from './UpdateSkillBookDialog';
import UpdateSkillCourseDialog from './UpdateSkillCourseDialog';

const SkillDialogs = ({ 
  openDialog,
  onClose,
  selectedItemType,
  selectedItem
}) => {
  return (
    <>
      {openDialog === DialogTypes.CreateSkill && (
        <CreateSkillWizard 
          isOpen
          onClose={onClose}
        />
      )}

      {openDialog === DialogTypes.UpdateHours && (
        <UpdateSkillHoursDialog 
          isOpen 
          onClose={onClose} 
        />
      )}

      {openDialog === DialogTypes.UpdateGoal && (
        <UpdateSkillWeeklyGoalDialog 
          isOpen 
          onClose={onClose} 
        />
      )}

      {openDialog === DialogTypes.ChooseSkillItemType && (
        <ChooseSkillItemTypeDialog 
          isOpen
          onClose={onClose} 
        />
      )}
      {openDialog === DialogTypes.CreateSkillItem && (
        <CreateSkillItemDialog 
          isOpen
          itemType={selectedItemType} 
          onClose={onClose}
        />
      )}

      {openDialog === DialogTypes.UpdateSkillBook && (
        <UpdateSkillBookDialog 
          isOpen
          book={selectedItem} 
          onClose={onClose} 
        />
      )}

      {openDialog === DialogTypes.UpdateSkillCourse && (
        <UpdateSkillCourseDialog 
          isOpen 
          course={selectedItem} 
          onClose={onClose} 
        />
      )}
    </>
  );
}

export default SkillDialogs;