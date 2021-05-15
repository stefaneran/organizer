import * as React from 'react';
import './styles.scss';
import { loadUserFromLocalStorage } from '@store/utils/localstorage';
import ContentView from '@core/components/ContentView';
import RegistrationDialog from '@core/components/RegistrationDialog';
import checkIsMobile from '@core/utils/checkIsMobile';

const App = ({
  app,
  register,
  login,
  logout,
  setIsMobile,
  ...actions
}) => {

  const { user: { loggedIn }, isMobile, error } = app;

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
    const isMobile = checkIsMobile();
    if (isMobile) {
      setIsMobile({ isMobile })
    }
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      actions.getAllActivities();
      actions.getAllContactsAndEvents();
      actions.getAllInventory();
      actions.getAllRecipes();
    }
  }, [loggedIn]);

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
    actions.clearActivities();
    actions.clearContactsAndEvents();
    actions.clearInventory();
    actions.clearRecipes();
  }

  return (
    <>
      {error.active ? (
        <p style={{ padding: '1.5em', fontSize: '2em' }}> 
          There was a critical error - {error.message} 
        </p>
      ) : (
        <div className="appContainer">
          <ContentView 
            app={app}
            setLoginDialog={handleChangeLoginDialog} 
            onLogout={handleLogout}
          />
          {dialog.isOpen && (
            <RegistrationDialog 
              isMobile={isMobile}
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