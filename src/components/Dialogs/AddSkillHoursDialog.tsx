import * as React from 'react';
import { GenericDialog } from '@components/Dialogs/GenericDialog';
import addSkillHours from '@data/inputDialogs/addSkillHours';
import { getDefaultFormData, getSimpleFormData } from '@utils/formDataUtils';
// TODO: Temporary until I fix FormGrid
// import { FormCreator } from '@components/FormCreator';
import SliderInput from '@components/FormCreator/SliderInput';

const { useState } = React;

const AddSkillHoursDialog = ({ isOpen, onClose }) => {

  const [formData, setFormData] = useState(getDefaultFormData(addSkillHours));

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
      title={"Choose Category"}
      onClose={handleClose}
      actionsType={'simpleForm'}
    >
      <SliderInput style={{ marginTop: '1em' }} data={{ ...addSkillHours.data.hours, handleChange }} />
    </GenericDialog>
  );
}

/*
  <FormCreator 
    formData={getSimpleFormData(addSkillHours, formData)}
    formGrid={{x:1, y:1}}
    lastInputField={'hours'}
    onChange={handleChange}
  />
*/

export default AddSkillHoursDialog;