import { connect } from 'react-redux';
import App from './App';
import { setIsMobile } from '@store/app';
import { register, login, logout } from '@store/app/thunks';
import { getAllContacts } from '@contacts/store/thunks';
import { clearContacts } from '@contacts/store';
import { getAllRecipes } from '@recipes/store/thunks';
import { clearRecipes } from '@recipes/store';
import { getAllInventory } from '@inventory/store/thunks';
import { clearInventory } from '@inventory/store';

const mapStateToProps = state => ({
  error: state.app.error,
  loggedIn: state.app.user.loggedIn,
  isMobile: state.app.isMobile
});

const mapDispatchToProps = {
  register,
  login,
  logout,
  setIsMobile,
  getAllContacts,
  clearContacts,
  getAllRecipes,
  clearRecipes,
  getAllInventory,
  clearInventory
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);