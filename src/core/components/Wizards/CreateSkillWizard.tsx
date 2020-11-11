import * as React from 'react';
import { GenericDialog } from '@core/components/GenericDialog';
import { FormCreator } from '@core/components/FormCreator';
import createSkillSchema from '@core/schemas/wizards/createSkillData';
import { getDefaultFormData, getStepFormData } from '@core/utils/formDataUtils';
import getIndexByDirection from '@core/utils/getIndexByDirection';

interface CloseProps {
  isSubmit: boolean;
  formData: any;
}

export interface WizardProps {
  isOpen: boolean;
  onClose(options?: CloseProps): void;
}
const CreateSkillWizard = ({ isOpen, onClose }: WizardProps) => {

  // The form data of all fields across all steps
  const [formData, setFormData] = React.useState(getDefaultFormData(createSkillSchema));
  // Current wizard step index
  const [currentIndex, setCurrentIndex] = React.useState(0);
  // Last input changed
  const [lastInputField, setLastInputField] = React.useState('');

  // Handle change in form input
  const handleChange = (inputName, inputValue) => {
    setFormData({ ...formData, [inputName]: inputValue });
    setLastInputField(inputName);
  }

  const handleStepChange = (direction: 1 | -1) => () => {
    const newIndex = getIndexByDirection({
      currentIndex,
      length: createSkillSchema.steps.length,
      direction,
      canWrap: false
    });
    setCurrentIndex(newIndex);
  }

  const handleClose = (options?: CloseProps) => (event?) => {
    let isSubmit = options ? options.isSubmit : false;
    onClose({ isSubmit, formData });
  }

  const currentStep = createSkillSchema.steps[currentIndex];

  const currentStepForm = getStepFormData(createSkillSchema, currentIndex, formData);
  const currentStepGrid = currentStep.formGrid;

  const dialogActionsData = {
    index: currentIndex, 
    maxSteps: createSkillSchema.steps.length, 
    handler: handleStepChange, 
    canSkip: currentStep.canSkip
  }

  return (
    <GenericDialog 
      isOpen={isOpen} 
      title={"Create Category"} 
      actionsType="wizard"
      actionsData={dialogActionsData} 
      onClose={handleClose}
    >
      <FormCreator 
        formData={currentStepForm} 
        formGrid={currentStepGrid}
        lastInputField={lastInputField}
        onChange={handleChange}
      />
    </GenericDialog>
  );
}

export default CreateSkillWizard;