import { connect } from 'react-redux';
import ContactsContainer from './ContactsContainer';
import { createContact, editContact, deleteContact } from '@contacts/store/thunks';

const mapStateToProps = state => ({
  contacts: state.contactsStore.contacts,
  activities: state.activitiesStore.activities
});

const mapDispatchToProps = {
  createContact,
  editContact,
  deleteContact
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsContainer);