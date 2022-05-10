import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { connector, ReduxProps } from 'app/container/AppConnector';
import ContentView from 'app/components/ContentView';
import RegistrationDialog from '@core/components/RegistrationDialog';
import checkIsMobile from '@core/utils/checkIsMobile';
import parseGetParams from '@core/utils/parseGetParams';
import { loadUserFromLocalStorage } from '@core/localstorage/user';

const useStyles = makeStyles(() => createStyles({
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

const AppContainer: React.FC<ReduxProps> = ({
  app,
  login,
  register,
  logout,
  setIsMobile
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
      const user = loadUserFromLocalStorage();
      if (user && !loggedIn) {
        const { userName, password } = user;
        if (userName && password) {
          login(user)
        }
      }
    }
    // Check if mobile for conditional rendering
    const isMobile = checkIsMobile();
    if (isMobile) {
      setIsMobile({ isMobile })
    }
  }, []);

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

export default connector(AppContainer);