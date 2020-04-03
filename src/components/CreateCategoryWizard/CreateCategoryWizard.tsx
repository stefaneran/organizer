import * as React from 'react';
import { GenericWizardDialog, useWizardIndex } from '@components/GenericWizardDialog';
import { FormCreator } from '@components/FormCreator';

export interface ICreateWizardProps {
  isOpen: boolean;
  title: string;
  data: {
    step: any[];
  } | null;
}

const CreateCategoryWizard = ({ isOpen, title, data }: ICreateWizardProps) => {
  const maxSteps = data.step.length - 1;
  const { index, setIndex, handler } = useWizardIndex({ maxSteps });

  // Handle change in form 
  const handleChange = (inputName, inputData) => {}
  // Handle dialog action (Back/Skip/Next)
  const handleAction = (direction: -1 | 1) => () => {}

  const wizardData = {
    isOpen, 
    title, 
    index, 
    maxSteps, 
    handler: handleAction
  }

  return (
    <GenericWizardDialog data={wizardData}>
      <FormCreator formData={null} onChange={handleChange} />
    </GenericWizardDialog>
  );
}

export default CreateCategoryWizard;