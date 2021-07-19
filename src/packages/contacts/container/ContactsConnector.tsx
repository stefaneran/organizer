import { connect, ConnectedProps } from 'react-redux';
import { 
  createContact, 
  editContact, 
  deleteContact, 
  updateLastContact,
  createEvent, 
  editEvent, 
  deleteEvent 
} from 'contacts/store/thunks';
import { initGroups } from 'contacts/store';
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
  updateLastContact,
  createEvent,
  editEvent,
  deleteEvent
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

export type DispatchProps = {
  initGroups: ReduxProps["initGroups"],
  createContact: ReduxProps["createContact"],
  editContact: ReduxProps["editContact"],
  deleteContact: ReduxProps["deleteContact"],
  updateLastContact: ReduxProps["updateLastContact"],
  createEvent: ReduxProps["createEvent"],
  editEvent: ReduxProps["editEvent"],
  deleteEvent: ReduxProps["deleteEvent"]
};