import * as React from 'react';
import { GenericDialog } from '@core/components/GenericDialog';
import updateSkillHoursData from '@core/schemas/inputDialogs/updateSkillHoursData';
import { getDefaultFormData } from '@core/utils/formDataUtils';
import SliderInput from '@core/components/FormInputs/SliderInput';

const UpdateSkillHoursDialog = ({ isOpen, onClose }) => {

  const [formData, setFormData] = React.useState(getDefaultFormData(updateSkillHoursData));

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
      <SliderInput style={{ marginTop: '1em' }} handleChange={handleChange} {...updateSkillHoursData.data.hours} />
    </GenericDialog>
  );
}

export default UpdateSkillHoursDialog;