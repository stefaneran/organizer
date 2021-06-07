import { connect } from 'react-redux';
import ContactsContainer from './ContactsContainer';
import { createContact, editContact, deleteContact, createEvent, editEvent, deleteEvent } from '@contacts/store/thunks';
import { initGroups } from '@contacts/store';
import { AppStore } from '@core/types';

const mapStateToProps = (state: AppStore) => ({
  contacts: state.contactsStore.contacts,
  groups: state.contactsStore.groups,
  events: state.contactsStore.events,
  activities: state.activitiesStore.activities
});

const mapDispatchToProps = {
  initGroups,
  createContact,
  editContact,
  deleteContact,
  createEvent,
  editEvent,
  deleteEvent
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsContainer);