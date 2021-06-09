import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { loadUserFromLocalStorage } from '@core/utils/localstorage';
import ContentView from '@core/components/ContentView';
import RegistrationDialog from '@core/components/RegistrationDialog';
import checkIsMobile from '@core/utils/checkIsMobile';
import { AppStore } from '@core/types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    height: '100%',
    overflowY: 'hidden',
    overflowX: 'hidden'
  }
}));

interface Props {
  app: AppStore["app"];
  login: Function;
  register: Function;
  logout: Function;
  setIsMobile: Function;
  getAllActivities: Function;
  clearActivities: Function;
  getAllContactsAndEvents: Function;
  clearContactsAndEvents: Function;
  getAllRecipes: Function;
  clearRecipes: Function;
  getAllInventory: Function;
  clearInventory: Function;
}

interface DialogState {
  type: string;
  isOpen: boolean;
}

const App: React.FC<Props> = ({
  app,
  login,
  register,
  logout,
  setIsMobile,
  getAllActivities,
  clearActivities,
  getAllContactsAndEvents,
  clearContactsAndEvents,
  getAllRecipes,
  clearRecipes,
  getAllInventory,
  clearInventory
}) => {
  const classes = useStyles();
  const { user: { loggedIn }, isMobile, error } = app;

  const [dialog, setDialog] = React.useState({
    type: '', // 'register' or 'login'
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
      // TODO Make these a single request to decrease load time
      getAllActivities();
      getAllContactsAndEvents();
      getAllInventory();
      getAllRecipes();
    }
  }, [loggedIn]);

  const handleChangeLoginDialog = (props: DialogState) => () => {
    setDialog(props);
  }

  const handleSubmit = async () => {
    const isLogin = dialog.type === 'login';
    const api = isLogin ? login : register;
    await api(dialogInputs);
    setDialog({ type: '', isOpen: false });
  }

  const handleLogout = () => {
    logout();
    clearActivities();
    clearContactsAndEvents();
    clearInventory();
    clearRecipes();
  }

  return (
    <>
      {error.active ? (
        <p style={{ padding: '1.5em', fontSize: '2em' }}> 
          There was a critical error - {error.message} 
        </p>
      ) : (
        <div className={classes.container}>
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