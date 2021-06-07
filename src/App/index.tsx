import { connect } from 'react-redux';
import App from './App';
import { setIsMobile } from '@app/store/reducer';
import { register, login, logout } from '@app/store/thunks';
import { getAllActivities } from '@activities/store/thunks';
import { clearActivities } from '@activities/store';
import { getAllContactsAndEvents } from '@contacts/store/thunks';
import { clearContactsAndEvents } from '@contacts/store';
import { getAllRecipes } from '@recipes/store/thunks';
import { clearRecipes } from '@recipes/store';
import { getAllInventory } from '@inventory/store/thunks';
import { clearInventory } from '@inventory/store';
import { AppStore } from '@core/types';

const mapStateToProps = (state: AppStore) => ({
  app: state.app,
  error: state.app.error,
  loggedIn: state.app.user.loggedIn,
  isMobile: state.app.isMobile
});

const mapDispatchToProps = {
  register,
  login,
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
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);