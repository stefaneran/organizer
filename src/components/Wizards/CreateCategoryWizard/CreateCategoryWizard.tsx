import * as React from 'react';
import { GenericWizard, useWizardIndex } from '@components/Wizards/GenericWizard';
import { FormCreator } from '@components/FormCreator';
import { getDefaultFormData, getStepFormData } from '@utils/formDataUtils';
import { CategoryType } from '@interfaces/categories';
import wizardForm from '@mocks/wizardForm.mock';

interface IFormData {
  
}

interface ICloseProps {
  isSubmit: boolean;
  formData: IFormData;
}

export interface ICreateWizardProps {
  isOpen: boolean;
  onClose(options?: ICloseProps): void;
}

const CreateCategoryWizard = ({ isOpen, onClose }: ICreateWizardProps) => {

  // The category chosen to create (Default Skill for now)
  const [chosenCategory, setChosenCategory] = React.useState(CategoryType.Skill);
  // All data for specific category
  const [formData, setFormData] = React.useState(chosenCategory ? getDefaultFormData(wizardForm) : {});
  // Last input changed to 
  const [lastInputField, setLastInputField] = React.useState('');
  
  const { steps } = wizardForm;
  // Wizard step state management
  const { index, changeStep } = useWizardIndex({ maxSteps: steps.length });
  // Current step info 
  const { formGrid } = steps[index];

  // Handle change in form input
  const handleChange = (inputName, inputValue) => {
    setFormData({ ...formData, [inputName]: inputValue });
    setLastInputField(inputName);
  }
  // Handle dialog action (Back/Skip/Next)
  const handleAction = (direction: -1 | 1) => () => {
    changeStep(direction)();
  }

  const handleClose = (options?: ICloseProps) => (event?) => {
    let isSubmit = options ? options.isSubmit : false;
    onClose({ isSubmit, formData });
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
    <GenericWizard data={wizardData} onClose={handleClose}>
      <FormCreator 
        formData={getStepFormData(wizardForm, index, formData)} 
        formGrid={formGrid}
        lastInputField={lastInputField}
        onChange={handleChange} 
      />
    </GenericWizard>
  );
}

export default CreateCategoryWizard;