import * as React from 'react';
import { GenericDialog } from '@core/components/GenericDialog';
import updateSkillBook from '@core/schemas/inputDialogs/updateSkillBookData';
import { getDefaultFormData } from '@core/utils/formDataUtils';
import SliderInput from '@core/components/FormInputs/SliderInput';

const UpdateSkillBookDialog = ({ isOpen, book, onClose }) => {
  
  const skillBook = updateSkillBook(book);

  const [formData, setFormData] = React.useState(getDefaultFormData(skillBook));

  const handleChange = (inputName, inputValue) => {
    setFormData({ ...formData, [inputName]: inputValue });
  }

  const handleClose = (options?) => () => {
    let isSubmit = options ? options.isSubmit : false;
    onClose({ isSubmit, pagesValue: formData['pages'] });
  }

  return (
    <GenericDialog
      isOpen={isOpen} 
      title={"Pages Read Today"}
      onClose={handleClose}
      actionsType={'simpleForm'}
    >
      <SliderInput style={{ marginTop: '1em' }} handleChange={handleChange} {...skillBook.data.pages} />
    </GenericDialog>
  );
}

export default UpdateSkillBookDialog;