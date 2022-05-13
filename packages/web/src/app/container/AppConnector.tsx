import { connect, ConnectedProps } from 'react-redux';
// Reducer actions
import { setIsMobile } from 'app/store/reducer';
import { setActivities } from 'activities/store';
import { setContactsAndEvents } from 'contacts/store';
import { setRecipes } from 'recipes/store';
import { setInventoryData } from 'inventory/store';
// Thunks
import { register, login, logout } from 'app/store/thunks';
// Types
import { RootState } from '@core/types';

const mapStateToProps = (state: RootState) => ({
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
  setContactsAndEvents,
  setRecipes,
  setInventoryData
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>