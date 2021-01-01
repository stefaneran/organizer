import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import mapTypeToActions from './mapTypeToActions';

interface DialogProps {
  isOpen: boolean;
  title: string;
  onClose(options?: any): (event?) => void;
  children: React.ReactNode;
  actionsType?: string;
  actionsData?: any; // Can vary from type to type (refer to mapTypeToActions.tsx)
  maxWidth?: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    '& .MuiDialog-paper': {
      minHeight: '30%',
      minWidth: '40%',
    },
    '& [role="dialog"]': {
      maxWidth: '1000px'
    }
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff'
  },
  closeIcon: {
    margin: '0.7em',
    padding: '0.2em',
    position: 'absolute',
    right: '0',
    top: '0'
  }
}));

const GenericDialog = ({ isOpen, title, children, actionsType, actionsData, onClose, maxWidth }: DialogProps) => {
  const classes = useStyles();
  return (
    <Dialog open={isOpen} onClose={onClose()} className={classes.container} style={{ maxWidth }}>
      <DialogTitle className={classes.header}>
        <Typography variant="h5">{title}</Typography>
        <IconButton className={classes.closeIcon} onClick={onClose()} color="primary" component="span">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      {actionsType && (
        <DialogActions>
          {mapTypeToActions(actionsType, actionsData, onClose)}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default GenericDialog;