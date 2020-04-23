import * as React from 'react';
import { GenericDialog } from '@components/Dialogs/GenericDialog';
import updateSkillBook from '@data/inputDialogs/updateSkillBookData';
import { getDefaultFormData } from '@utils/formDataUtils';
import SliderInput from '@components/FormCreator/SliderInput';

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
      <SliderInput style={{ marginTop: '1em' }} data={{ ...skillBook.data.pages, handleChange }} />
    </GenericDialog>
  );
}

export default UpdateSkillBookDialog;