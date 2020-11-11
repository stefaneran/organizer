import * as React from 'react';
import {
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  TextField 
} from '@material-ui/core';

const RegistrationDialog = ({ 
  dialogType,
  dialogInputs, 
  handleSubmit, 
  setDialogInputs, 
  setDialog 
}) => {

  const handleChange = (type) => (event) => {
    if (type === 'username') {
      setDialogInputs({ userName: event.target.value, password: dialogInputs.password })
    } else {
      setDialogInputs({ userName: dialogInputs.userName, password: event.target.value })
    }
  }

  return (
    <Dialog open>
      <DialogTitle>
        <Typography></Typography>
      </DialogTitle>
      <DialogContent>
        <TextField 
          value={dialogInputs.userName} 
          onChange={handleChange('username')} 
          placeholder="User Name" 
        />
        <br /><br />
        <TextField 
          value={dialogInputs.password} 
          placeholder="Password" 
          type="password"
          onChange={handleChange('password')} 
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialog({ type: undefined, isOpen: false })}>Cancel</Button>
        <Button onClick={handleSubmit}>{dialogType === 'login' ? "Login" : "Register"}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default RegistrationDialog;