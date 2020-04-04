import * as React from 'react';
import { GenericWizard, useWizardIndex } from '@components/Wizards/GenericWizard';
import { FormCreator } from '@components/FormCreator';
import wizardForm from '@mocks/wizardForm.mock';

export interface ICreateWizardProps {
  isOpen: boolean;
}

// Get form data for specific wizard steps
const getStepFormData = (index) => 
  wizardForm.steps[index].fields.map(fieldName => ({ ...wizardForm.data[fieldName] }));

// Populate state hook object with fieldName/value key pairs
const getDefaultFormData = () => {
  const defaultFormData = {};
  for(const fieldName in wizardForm.data) {
    const { defaultValue } = wizardForm.data[fieldName];
    defaultFormData[fieldName] = defaultValue ? defaultValue : null;
  }
  return defaultFormData;
}

const CreateCategoryWizard = ({ isOpen }: ICreateWizardProps) => {
  const [formData, setFormData] = React.useState(getDefaultFormData())
  const { steps } = wizardForm;
  // Wizard step state management
  const { index, changeStep } = useWizardIndex({ maxSteps: steps.length });
  // Current step info 
  const { formGrid } = steps[index];

  // Handle change in form input
  const handleChange = (inputName, inputData) => {
    setFormData({ ...formData, [inputName]: inputData });
  }
  // Handle dialog action (Back/Skip/Next)
  const handleAction = (direction: -1 | 1) => () => {
    changeStep(direction)();
  }

  const wizardData = {
    isOpen, 
    title: "Create new category", 
    index, 
    maxSteps: steps.length - 1, 
    changeStep: handleAction,
    canSkip: steps[index].canSkip
  }

  return (
    <GenericWizard data={wizardData}>
      <FormCreator 
        formData={getStepFormData(index)} 
        formGrid={formGrid}
        onChange={handleChange} 
      />
    </GenericWizard>
  );
}

export default CreateCategoryWizard;