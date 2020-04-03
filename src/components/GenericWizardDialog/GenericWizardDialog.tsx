import * as React from 'react';
import { GenericDialog } from '@components/GenericDialog';

interface IGenericWizardProps {
  data: {
    isOpen: boolean;
    title: string;
    index: number;
    maxSteps: number;
    handler: any;
  };
  children: React.ReactNode;
}

const GenericWizardDialog = ({ data, children }: IGenericWizardProps) => {
  const { isOpen, title, index, maxSteps, handler } = data;
  return (
    <GenericDialog 
      isOpen={isOpen} 
      title={title} 
      actionsType="wizard"
      actionsData={{index, maxSteps, handler}} 
    >
      {children}
    </GenericDialog>
  );
}

export default GenericWizardDialog;