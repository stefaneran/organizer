import * as React from 'react';
import { GenericDialog } from '@core/components/GenericDialog';
import TextMultiSelect from '@core/components/FormInputs/TextMultiSelect';

const EditContactGroups = ({ isOpen, onClose, groups, contactGroups }) => {

  const defaultValue = contactGroups.map(group => ({ label: group, value: group }));
  const options = groups.map(group => ({ label: group, value: group }));

  const [formData, setFormData] = React.useState(defaultValue);

  const handleChange = (inputName, inputValue) => {
    setFormData(inputValue);
  }

  const handleClose = (options?) => () => {
    let isSubmit = options ? options.isSubmit : false;
    onClose({ 
      isSubmit, 
      formData: formData.map(group => group.value) 
    });
  }

  return (
    <GenericDialog
      isOpen={isOpen} 
      title={"Edit Contact Groups"}
      onClose={handleClose}
      actionsType={'simpleForm'}
    >
      <TextMultiSelect
        name={'groups'}
        label={'Groups'}
        options={options}
        defaultValue={defaultValue}
        handleChange={handleChange}
        multiple={true}
        canAdd={true}
      />
    </GenericDialog>
  );
}

export default EditContactGroups;