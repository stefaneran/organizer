import * as React from 'react';
import { GenericDialog } from '@components/core/GenericDialog';
import updateSkillBook from '@schemas/inputDialogs/updateSkillBookData';
import { getDefaultFormData } from '@utils/formDataUtils';
import SliderInput from '@components/core/FormInputs/SliderInput';

const { useState } = React;

const UpdateSkillBookDialog = ({ isOpen, book, onClose }) => {

  const skillBook = updateSkillBook(book);

  const [formData, setFormData] = useState(getDefaultFormData(skillBook));

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