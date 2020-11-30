import * as React from 'react';
import './styles.scss';
import { loadUserFromLocalStorage } from '@store/utils/localstorage';
import ContentView from '@core/components/ContentView';
import RegistrationDialog from '@core/components/RegistrationDialog';

const App = ({
  error,
  loggedIn,
  register,
  login,
  logout,
  getAllContacts,
  getAllSkills,
  clearContacts,
  clearSkills
}) => {
  const [isDataValidated, setValidated] = React.useState(false);
  const [isActivityUpdated, setActivityUpdated] = React.useState(false);

  const [dialog, setDialog] = React.useState({
    type: undefined, // 'register' or 'login'
    isOpen: false
  }) 
  const [dialogInputs, setDialogInputs] = React.useState({
    userName: '',
    password: ''
  })

  // load user data from local storage and login
  React.useEffect(() => {
    const loadResult = loadUserFromLocalStorage();
    if (loadResult.success) {
      const { userName, password } = loadResult.user;
      if (userName && password) {
        login(loadResult.user)
      }
    }
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      getAllContacts();
      getAllSkills();
    }
  }, [loggedIn])

  // Validate for any missing properties due to changes
  /*
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
      // updateActivity();
      setActivityUpdated(true);
    }
  }, [store, isDataValidated]);
  */

  const handleChangeLoginDialog = (props: { type: string; isOpen: boolean; }) => () => {
    setDialog(props);
  }

  const handleSubmit = async () => {
    const isLogin = dialog.type === 'login';
    const api = isLogin ? login : register;
    await api(dialogInputs);
    setDialog({ type: undefined, isOpen: false });
  }

  const handleLogout = () => {
    logout();
    clearContacts();
    clearSkills();
  }

  return (
    <>
      {error.active ? (
        <p> There was a critical error - {error.message} </p>
      ) : (
        <div className="appContainer">
          <ContentView 
            setLoginDialog={handleChangeLoginDialog} 
            onLogout={handleLogout}
          />
          {dialog.isOpen && (
            <RegistrationDialog 
              dialogType={dialog.type}
              dialogInputs={dialogInputs}
              handleSubmit={handleSubmit}
              setDialogInputs={setDialogInputs}
              setDialog={setDialog}
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;