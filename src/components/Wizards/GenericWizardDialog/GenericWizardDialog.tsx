import * as React from 'react';
import { GenericDialog } from '@components/Dialogs/GenericDialog';

interface IGenericWizardProps {
  data: {
    isOpen: boolean;
    title: string;
    index: number;
    maxSteps: number;
    changeStep: any;
    canSkip?: boolean;
  };
  children: React.ReactNode;
}

const GenericWizardDialog = ({ data, children }: IGenericWizardProps) => {
  const { isOpen, title, index, maxSteps, changeStep, canSkip } = data;
  const actionsData = {
    index, 
    maxSteps, 
    handler: changeStep, 
    canSkip 
  }
  return (
    <GenericDialog 
      isOpen={isOpen} 
      title={title} 
      actionsType="wizard"
      actionsData={actionsData} 
    >
      {children}
    </GenericDialog>
  );
}

export default GenericWizardDialog;