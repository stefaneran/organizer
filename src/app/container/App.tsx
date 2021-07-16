import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { connector, ReduxProps } from './index';
import ContentView from 'app/components/ContentView';
import RegistrationDialog from 'core/components/RegistrationDialog';
import checkIsMobile from 'core/utils/checkIsMobile';
import parseGetParams from 'core/utils/parseGetParams';
import { loadUserFromLocalStorage } from 'core/utils/localstorage';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    height: '100%',
    overflowY: 'hidden',
    overflowX: 'hidden'
  }
}));

interface DialogState {
  type: string;
  isOpen: boolean;
}

const App: React.FC<ReduxProps> = ({
  app,
  getAllData,
  login,
  register,
  logout,
  setIsMobile,
  setActivities,
  clearActivities,
  setContactsAndEvents,
  clearContactsAndEvents,
  setRecipes,
  clearRecipes,
  setInventory,
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
    const params = parseGetParams(window.location.href);
    // Log into demo account if URL has "?demo=true" GET param
    if (params.demo && params.demo === 'true') {
      login({ userName: 'demo', password: 'demo' });
    } 
    // Otherwise try to load user creds from localstorage and login (TODO change to cookies)
    else {
      const loadResult = loadUserFromLocalStorage();
      if (loadResult.success) {
        const { userName, password } = loadResult.user;
        if (userName && password) {
          login(loadResult.user)
        }
      }
    }
    // Check if mobile for conditional rendering
    const isMobile = checkIsMobile();
    if (isMobile) {
      setIsMobile({ isMobile })
    }
  }, []);

  React.useEffect(() => {
    async function fetchUserData() {
      if (loggedIn) {
        const data = await getAllData();
        const { activities, contacts, events, inventory, recipes } = data;
        setActivities(activities);
        setContactsAndEvents({ contacts, events });
        setInventory(inventory);
        setRecipes(recipes);
      } else {
        clearActivities();
        clearContactsAndEvents();
        clearInventory();
        clearRecipes();
      }
    }
    fetchUserData();
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

export default connector(App);