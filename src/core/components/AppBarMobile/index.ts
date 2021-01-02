import { connect } from 'react-redux';
import AppBarMobile from './AppBarMobile';
import { uploadContacts } from '@contacts/store/thunks';
import { uploadSkills } from '@skills/store/thunks';

const mapStateToProps = state => ({
  app: state.app,
  contacts: state.contactsStore.contacts,
  skills: state.skillsStore.skills
});

const mapDispatchToProps = {
  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBarMobile);