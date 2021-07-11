import { connect } from 'react-redux';
import App from './App';
import { setIsMobile } from '@app/store/reducer';
import { getAllData, register, login, logout } from '@app/store/thunks';
import { setActivities, clearActivities } from '@activities/store';
import { setContactsAndEvents, clearContactsAndEvents } from '@contacts/store';
import { setRecipes, clearRecipes } from '@recipes/store';
import { setInventory, clearInventory } from '@inventory/store';
import { AppStore } from '@core/types';

const mapStateToProps = (state: AppStore) => ({
  app: state.app,
  error: state.app.error,
  loggedIn: state.app.user.loggedIn,
  isMobile: state.app.isMobile
});

const mapDispatchToProps = {
  getAllData,
  register,
  login,
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
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);