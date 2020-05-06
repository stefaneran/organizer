import * as React from 'react';
import { GenericDialog } from '@components/Dialogs/GenericDialog';
import updateSkillHoursData from '@data/inputDialogs/updateSkillHoursData';
import { getDefaultFormData } from '@utils/formDataUtils';
import SliderInput from '@components/FormCreator/SliderInput';

const { useState } = React;

const UpdateSkillHoursDialog = ({ isOpen, onClose }) => {

  const [formData, setFormData] = useState(getDefaultFormData(updateSkillHoursData));

  const handleChange = (inputName, inputValue) => {
    setFormData({ ...formData, [inputName]: inputValue });
  }

  const handleClose = (options?) => () => {
    let isSubmit = options ? options.isSubmit : false;
    onClose({ isSubmit, hoursValue: formData['hours'] });
  }

  return (
    <GenericDialog
      isOpen={isOpen} 
      title={"Hours Practiced"}
      onClose={handleClose}
      actionsType={'simpleForm'}
    >
      <SliderInput style={{ marginTop: '1em' }} data={{ ...updateSkillHoursData.data.hours, handleChange }} />
    </GenericDialog>
  );
}

export default UpdateSkillHoursDialog;