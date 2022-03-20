import { connect, ConnectedProps } from 'react-redux';
// Reducer actions
import { setIsMobile } from 'app/store/reducer';
import { setActivities, clearActivities } from 'activities/store';
import { setContactsAndEvents, clearContactsAndEvents } from 'contacts/store';
import { setRecipes, clearRecipes } from 'recipes/store';
import { setInventoryData, clearInventoryData } from 'inventory/store';
// Thunks
import { register, login, logout } from 'app/store/thunks';
// Types
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
  setActivities,
  clearActivities,
  setContactsAndEvents,
  clearContactsAndEvents,
  setRecipes,
  clearRecipes,
  setInventoryData,
  clearInventoryData
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>