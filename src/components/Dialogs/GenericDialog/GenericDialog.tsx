import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import typeToActionsMap from './typeToActionsMap';

interface IDialogProps {
  isOpen: boolean;
  title?: string;
  actionsType: string;
  actionsData: any; // Can vary from type to type (refer to typeToActionsMap.tsx)
  children: React.ReactNode;
}

const GenericDialog = ({ isOpen, title, children, actionsType, actionsData }: IDialogProps) => {
  return (
    <Dialog open={isOpen}>
      {title && (
        <DialogTitle>
          {title}
        </DialogTitle>
      )}
      <DialogContent>
        {children}
      </DialogContent>
      {actionsType && actionsData && (
        <DialogActions>
          {typeToActionsMap(actionsType, actionsData)}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default GenericDialog;