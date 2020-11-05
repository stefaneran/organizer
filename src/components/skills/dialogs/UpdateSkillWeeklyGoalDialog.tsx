import * as React from 'react';
import { GenericDialog } from '@components/core/GenericDialog';
import updateSkillWeeklyGoalData from '@schemas/inputDialogs/updateSkillWeeklyGoalData';
import { getDefaultFormData } from '@utils/formDataUtils';
import SliderInput from '@components/core/FormInputs/SliderInput';

const { useState } = React;

const UpdateSkillWeeklyGoalDialog = ({ isOpen, onClose }) => {

  const [formData, setFormData] = useState(getDefaultFormData(updateSkillWeeklyGoalData));

  const handleChange = (inputName, inputValue) => {
    setFormData({ ...formData, [inputName]: inputValue });
  }

  const handleClose = (options?) => () => {
    let isSubmit = options ? options.isSubmit : false;
    onClose({ isSubmit, weeklyGoal: formData['weeklyGoal'] });
  }

  return (
    <GenericDialog
      isOpen={isOpen} 
      title={"Update Weekly Goal"}
      onClose={handleClose}
      actionsType={'simpleForm'}
    >
      <SliderInput style={{ marginTop: '1em' }} handleChange={handleChange} {...updateSkillWeeklyGoalData.data.weeklyGoal} />
    </GenericDialog>
  );
}

export default UpdateSkillWeeklyGoalDialog;