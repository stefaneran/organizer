import * as React from 'react';
import { GenericDialog } from '@components/core/GenericDialog';
import TextMultiSelect from '@components/core/FormInputs/TextMultiSelect';

const { useState } = React;

const EditContactSubgroups = ({ isOpen, subgroups, onClose }) => {

  const [formData, setFormData] = useState({ subgroups: [] });

  const options = subgroups.map(subgroup => ({ label: subgroup, value: subgroup }));

  const handleChange = (inputName, inputValue) => {
    setFormData({ subgroups: inputValue });
  }

  const handleClose = (options?) => () => {
    let isSubmit = options ? options.isSubmit : false;
    onClose({ 
      isSubmit, 
      newSubgroups: formData.subgroups.map(subgroup => subgroup.value) 
    });
  }

  return (
    <GenericDialog
      isOpen={isOpen} 
      title={"Edit Contact Subgroups"}
      onClose={handleClose}
      actionsType={'simpleForm'}
    >
      <TextMultiSelect
        name={'subgroups'}
        label={'Groups'}
        options={options}
        handleChange={handleChange}
        multiple={true}
        canAdd={true}
      />
    </GenericDialog>
  );
}

export default EditContactSubgroups;