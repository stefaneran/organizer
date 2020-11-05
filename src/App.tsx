import * as React from 'react';
import { connect } from 'react-redux';
import { CircularProgress, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  TextField 
} from '@material-ui/core';
import './styles.scss';
import mapStateToProps from './mapStateToProps';
import mapDispatchToProps from './mapDispatchToProps';
import ContentView from '@components/contacts/ContentView';
import { loadUserFromLocalStorage } from '@store/logic/localstorage';

const { log } = console;
const { useState, useEffect } = React;

const App = (store) => {
  const [isDataValidated, setValidated] = useState(false);
  const [isActivityUpdated, setActivityUpdated] = useState(false);
  const [dialog, setDialog] = useState({
    type: null, // 'register' or 'login'
    isOpen: false
  }) 
  const [dialogInputs, setDialogInputs] = useState({
    userName: '',
    password: ''
  })

  log('=== INFO: Store in App ===\n', store);

  // load user data from local storage and login
  useEffect(() => {
    const { success, user } = loadUserFromLocalStorage();
    if (success) {
      const { login } = store;
      const { userName, password } = user;
      if (userName && password) {
        login(user)
      }
    }
  }, []);

  // Validate for any missing properties due to changes
  useEffect(() => {
    const { validateData, updateActivity, data } = store;
    const { skills } = data;
    // Only run after loadData is done
    if(!isDataValidated && skills.length) {
      validateData();
      setValidated(true);
    }
    // Run after data is loaded and validated
    if(!isActivityUpdated && isDataValidated) {
      updateActivity();
      setActivityUpdated(true);
    }
  }, [store, isDataValidated]);

  const { error } = store;

  const handleSubmit = async () => {
    const isLogin = dialog.type === 'login';
    const api = isLogin ? store.login : store.register;
    await api(dialogInputs);
    setDialog({ type: null, isOpen: false });
  }

  return (
    <>
      {store.loading && (
        <div className="loading-overlay">
          <CircularProgress className="loading-progress" />
        </div>
      )}
      {error ? (
        <p> There was a critical error </p>
      ) : (
        <div className="appContainer">
          <ContentView store={store} tempDialog={setDialog} />
          {dialog.isOpen && (
            <Dialog open>
              <DialogTitle>
                <Typography></Typography>
              </DialogTitle>
              <DialogContent>
                <TextField 
                  value={dialogInputs.userName} 
                  onChange={(event) => setDialogInputs({ userName: event.target.value, password: dialogInputs.password })} 
                  placeholder="User Name" 
                />
                <br /><br />
                <TextField 
                  value={dialogInputs.password} 
                  placeholder="Password" 
                  type="password"
                  onChange={(event) => setDialogInputs({ userName: dialogInputs.userName, password: event.target.value })} 
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDialog({ type: null, isOpen: false })}>Cancel</Button>
                <Button onClick={handleSubmit}>{dialog.type === 'login' ? "Login" : "Register"}</Button>
              </DialogActions>
            </Dialog>
          )}
        </div>
      )}
    </>
  );
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);