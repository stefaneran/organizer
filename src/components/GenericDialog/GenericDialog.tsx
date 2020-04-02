import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

interface IDialogProps {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  actions?: any[]; // TODO - Decide shape later
}

const GenericDialog = ({ isOpen, title, children, actions = [] }: IDialogProps) => {
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
      {actions.length && (
        <DialogActions>
          actions.map(action => (
            <> Action </>
          ))
        </DialogActions>
      )}
    </Dialog>
  );
}

export default GenericDialog;