import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  TextField 
} from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  mobile: {
    '& > div > div': {
      width: '100%',
      height: '100%',
      maxWidth: 'none',
      maxHeight: 'none',
      margin: '0'
    }
  },
  mobileContent: {
    textAlign: 'center'
  },
  mobileTextInput: {
    '&:first-child': {
      marginTop: '6em',
      marginBottom: '4em'
    },
    '& input': {
      fontSize: '4em'
    }
  },
  mobileActions: {
    justifyContent: 'space-around',
    marginBottom: '14em'
  },
  mobileButton: {
    fontSize: '4em'
  }
}));

const RegistrationDialog = ({ 
  isMobile,
  dialogType,
  dialogInputs, 
  handleSubmit, 
  setDialogInputs, 
  setDialog 
}) => {
  const classes = useStyles();

  const handleChange = (type) => (event) => {
    if (type === 'username') {
      setDialogInputs({ userName: event.target.value, password: dialogInputs.password })
    } else {
      setDialogInputs({ userName: dialogInputs.userName, password: event.target.value })
    }
  }

  return (
    <Dialog open className={isMobile && classes.mobile}>
      <DialogTitle>
        <Typography></Typography>
      </DialogTitle>
      <DialogContent className={isMobile && classes.mobileContent}>
        <TextField 
          className={isMobile && classes.mobileTextInput}
          value={dialogInputs.userName} 
          variant="outlined"
          placeholder="User Name" 
          onChange={handleChange('username')}
        />
        <br /><br />
        <TextField 
          className={isMobile && classes.mobileTextInput}
          value={dialogInputs.password} 
          variant="outlined"
          placeholder="Password" 
          type="password"
          onChange={handleChange('password')} 
        />
      </DialogContent>
      <DialogActions className={isMobile && classes.mobileActions}>
        <Button 
          className={isMobile && classes.mobileButton}
          onClick={() => setDialog({ type: undefined, isOpen: false })}
          variant="outlined"
          color="primary"
        >
          Cancel
        </Button>
        <Button 
          className={isMobile && classes.mobileButton}
          onClick={handleSubmit}
          variant="outlined"
          color="primary"
        >
          {dialogType === 'login' ? "Login" : "Register"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RegistrationDialog;