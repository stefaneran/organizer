import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import mapTypeToActions from './mapTypeToActions';

interface IDialogProps {
  isOpen: boolean;
  title: string;
  actionsType?: string;
  actionsData?: any; // Can vary from type to type (refer to typeToActionsMap.tsx)
  onClose(options?: any): (event?) => void;
  children: React.ReactNode;
}

const useStyles = makeStyles(theme => ({
  closeIcon: {
    margin: '0.7em',
    padding: '0.2em',
    position: 'absolute',
    right: '0',
    top: '0'
  }
}));

const GenericDialog = ({ isOpen, title, children, actionsType, actionsData, onClose }: IDialogProps) => {
  const classes = useStyles();
  return (
    <Dialog open={isOpen} onClose={onClose()}>
      <DialogTitle>
        <span>{title}</span>
        <IconButton className={classes.closeIcon} onClick={onClose()} color="primary" component="span">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      {actionsType && actionsData && (
        <DialogActions>
          {mapTypeToActions(actionsType, actionsData, onClose)}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default GenericDialog;