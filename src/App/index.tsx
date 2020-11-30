import { connect } from 'react-redux';
import App from './App';
import { register, login, logout } from '@store/app/thunks';
import { getAllContacts } from '@contacts/store/thunks';
import { clearContacts } from '@contacts/store';
import { getAllSkills } from '@skills/store/thunks';
import { clearSkills } from '@skills/store';

const mapStateToProps = state => ({
  error: state.app.error,
  loggedIn: state.app.user.loggedIn
});

const mapDispatchToProps = {
  register,
  login,
  logout,
  getAllContacts,
  clearContacts,
  getAllSkills,
  clearSkills
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);