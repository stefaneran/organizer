import * as React from 'react';
import { GenericDialog } from '@components/Dialogs/GenericDialog';
import { FormCreator } from '@components/FormCreator';
import { CategoryType } from '@interfaces/categories';
import createSkillWizard, { ICreateSkillForm } from '@data/wizards/createSkill';
import { getDefaultFormData, getStepFormData } from '@utils/formDataUtils';
import getIndexByDirection from '@utils/getIndexByDirection';

const { useState } = React;

interface ICloseProps {
  isSubmit: boolean;
  formData: ICreateSkillForm | {};
}

export interface ICreateWizardProps {
  isOpen: boolean;
  onClose(options?: ICloseProps): void;
  categoryType: CategoryType;
}

const categoryFormModelMap = (category: CategoryType) => {
  const map = {
    [CategoryType.Skill]: createSkillWizard
  }
  return map[category];
}

const CreateCategoryWizard = ({ isOpen, onClose, categoryType }: ICreateWizardProps) => {

  // Form model for the chosen category type
  const formModel = categoryFormModelMap(categoryType);

  // The form data of all fields across all steps
  const [formData, setFormData] = useState(getDefaultFormData(formModel));
  // Current wizard step index
  const [currentIndex, setCurrentIndex] = useState(0);
  // Last input changed
  const [lastInputField, setLastInputField] = useState('');

  // Handle change in form input
  const handleChange = (inputName, inputValue) => {
    setFormData({ ...formData, [inputName]: inputValue });
    setLastInputField(inputName);
  }

  const handleStepChange = (direction: 1 | -1) => () => {
    const newIndex = getIndexByDirection({
      currentIndex,
      length: formModel.steps.length,
      direction,
      canWrap: false
    });
    setCurrentIndex(newIndex);
  }

  const handleClose = (options?: ICloseProps) => (event?) => {
    let isSubmit = options ? options.isSubmit : false;
    onClose({ isSubmit, formData });
  }

  const currentStep = formModel.steps[currentIndex];

  const currentStepForm = getStepFormData(formModel, currentIndex, formData);
  const currentStepGrid = currentStep.formGrid;

  const dialogActionsData = {
    index: currentIndex, 
    maxSteps: formModel.steps.length, 
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

export default CreateCategoryWizard;