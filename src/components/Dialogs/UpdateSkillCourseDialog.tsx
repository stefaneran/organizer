import * as React from 'react';
import { GenericDialog } from '@components/Dialogs/GenericDialog';
import updateSkillCourse from '@schemas/inputDialogs/updateSkillCourseData';
import { getDefaultFormData } from '@utils/formDataUtils';
import SliderInput from '@components/FormInputs/SliderInput';

const { useState } = React;

const UpdateSkillCourseDialog = ({ isOpen, course, onClose }) => {

  const skillCourse = updateSkillCourse(course);

  const [formData, setFormData] = useState(getDefaultFormData(skillCourse));

  const handleChange = (inputName, inputValue) => {
    setFormData({ ...formData, [inputName]: inputValue });
  }

  const handleClose = (options?) => () => {
    let isSubmit = options ? options.isSubmit : false;
    onClose({ isSubmit, classesValue: formData['classes'] });
  }

  return (
    <GenericDialog
      isOpen={isOpen} 
      title={"Classes Finished Today"}
      onClose={handleClose}
      actionsType={'simpleForm'}
    >
      <SliderInput style={{ marginTop: '1em' }} handleChange={handleChange} {...skillCourse.data.classes} />
    </GenericDialog>
  );
}

export default UpdateSkillCourseDialog;