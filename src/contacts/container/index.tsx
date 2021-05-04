import { connect } from 'react-redux';
import ContactsContainer from './ContactsContainer';
import { createContact, editContact, deleteContact } from '@contacts/store/thunks';
import { initGroups } from '@contacts/store';

const mapStateToProps = state => ({
  contacts: state.contactsStore.contacts,
  groups: state.contactsStore.groups,
  events: state.contactsStore.events,
  activities: state.activitiesStore.activities
});

const mapDispatchToProps = {
  initGroups,
  createContact,
  editContact,
  deleteContact
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsContainer);