import * as React from 'react';
import { GenericDialog } from '@core/components/GenericDialog';
import updateSkillWeeklyGoalData from '@core/schemas/inputDialogs/updateSkillWeeklyGoalData';
import { getDefaultFormData } from '@core/utils/formDataUtils';
import SliderInput from '@core/components/FormInputs/SliderInput';

const UpdateSkillWeeklyGoalDialog = ({ isOpen, onClose }) => {

  const [formData, setFormData] = React.useState(getDefaultFormData(updateSkillWeeklyGoalData));

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