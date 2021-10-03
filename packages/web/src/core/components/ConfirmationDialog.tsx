import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

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
  body: {
    padding: '2.5em 1.5em'
  },
  closeIcon: {
    margin: '0.7em',
    padding: '0.2em',
    position: 'absolute',
    right: '0',
    top: '0'
  }
}));

interface DialogProps {
  isOpen: boolean;
  onClose: (event?) => void;
  maxWidth?: string;
  confirmationTitle: string;
  confirmationText: string;
  primaryIcon?: JSX.Element;
  secondaryIcon?: JSX.Element;
  primaryText: string;
  secondaryText: string;
  onPrimaryAction: (event?) => void;
  onSecondaryAction: (event?) => void;
}

const ConfirmationDialog = ({ 
  isOpen, 
  onClose, 
  maxWidth,
  confirmationTitle,
  confirmationText,
  primaryIcon,
  secondaryIcon,
  primaryText,
  secondaryText,
  onPrimaryAction,
  onSecondaryAction
}: DialogProps) => {
  const classes = useStyles();
  return (
    <Dialog open={isOpen} onClose={onClose} className={classes.container} style={{ maxWidth }}>
      <DialogTitle className={classes.header}>
        <Typography variant="h5">{confirmationTitle}</Typography>
        <IconButton className={classes.closeIcon} onClick={onClose} color="inherit" component="span">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h5" className={classes.body}>
          {confirmationText}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onSecondaryAction}
          variant="outlined"
          color="secondary"
          endIcon={secondaryIcon}
        >
          {secondaryText}
        </Button>
        <Button
          onClick={onPrimaryAction}
          variant="outlined"
          color="primary"
          endIcon={primaryIcon}
        >
          {primaryText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog;