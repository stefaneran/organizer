import * as React from 'react';
import { GenericDialog } from '@core/components/GenericDialog';
import updateSkillCourse from '@core/schemas/inputDialogs/updateSkillCourseData';
import { getDefaultFormData } from '@core/utils/formDataUtils';
import SliderInput from '@core/components/FormInputs/SliderInput';

const UpdateSkillCourseDialog = ({ isOpen, course, onClose }) => {

  const skillCourse = updateSkillCourse(course);

  const [formData, setFormData] = React.useState(getDefaultFormData(skillCourse));

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