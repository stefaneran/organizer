import { connect, ConnectedProps } from 'react-redux';
import { 
  getContactsAndEvents,
  createContact, 
  editContact, 
  deleteContact, 
  updateLastContact,
  createEvent, 
  editEvent, 
  deleteEvent 
} from 'contacts/store/thunks';
import { getActivities } from 'activities/store/thunks';
import { initGroups } from 'contacts/store';
import { AppStore } from '@core/types';

const mapStateToProps = (state: AppStore) => ({
  loggedIn: state.app.user.loggedIn,
  lastUpdate: state.contactsStore.lastUpdate,
  contacts: state.contactsStore.contacts,
  groups: state.contactsStore.groups,
  events: state.contactsStore.events,
  activities: state.activitiesStore.activities
});

const mapDispatchToProps = {
  getActivities,
  getContactsAndEvents,
  initGroups,
  createContact,
  editContact,
  deleteContact,
  updateLastContact,
  createEvent,
  editEvent,
  deleteEvent
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

export type DispatchProps = {
  getActivities: ReduxProps["getActivities"],
  getContactsAndEvents: ReduxProps["getContactsAndEvents"],
  initGroups: ReduxProps["initGroups"],
  createContact: ReduxProps["createContact"],
  editContact: ReduxProps["editContact"],
  deleteContact: ReduxProps["deleteContact"],
  updateLastContact: ReduxProps["updateLastContact"],
  createEvent: ReduxProps["createEvent"],
  editEvent: ReduxProps["editEvent"],
  deleteEvent: ReduxProps["deleteEvent"]
};