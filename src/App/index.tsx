import * as React from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import './styles.scss';
import { 
  register as registerThunk, 
  login as loginThunk
} from '@store/app/thunks';
import { loadUserFromLocalStorage } from '@store/utils/localstorage';
import ContentView from '@core/components/ContentView';
import RegistrationDialog from '@core/components/RegistrationDialog';

const mapStateToProps = state => ({
  error: state.app.error,
  loading: state.app.loading
});

const mapDispatchToProps = {
  register: registerThunk,
  login: loginThunk
}

const App = ({
  error,
  loading,
  register,
  login
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

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <CircularProgress className="loading-progress" />
        </div>
      )}
      {error.active ? (
        <p> There was a critical error - {error.message} </p>
      ) : (
        <div className="appContainer">
          <ContentView setLoginDialog={handleChangeLoginDialog} />
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

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);