import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) => createStyles({
  sidepanel: {
    width: '30%',
    height: '100%',
    position: 'absolute',
    top: '0',
    transition: 'right 300ms',
    background: '#ecedf0'
  },
  topButtons: {
    textAlign: 'right'
  }
}));

interface Props {
  isOpen: boolean;
  onClose: ()=>void;
}

const ContactsFiltersSidePanel = ({
  isOpen,
  onClose
 }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.sidepanel} style={{ right: isOpen ? '0%' : '-100%' }}>
      <div className={classes.topButtons}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default ContactsFiltersSidePanel;