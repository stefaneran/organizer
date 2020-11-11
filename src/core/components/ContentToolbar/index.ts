import { connect } from 'react-redux';
import { logout } from '@store/app/thunks';
import ContentToolbar from './ContentToolbar';

const mapStateToProps = state => ({
  app: state.app,
  contacts: state.contactsStore.contacts,
  skills: state.skillsStore.skills
});

const mapDispatchToProps = {
  logout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentToolbar);