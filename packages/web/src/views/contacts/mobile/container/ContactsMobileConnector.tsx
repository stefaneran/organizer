import { connect, ConnectedProps } from 'react-redux';
import { getContactsAndEvents, updateLastContact } from 'contacts/store/thunks';
import { getActivities } from 'activities/store/thunks'
import { initGroups } from 'contacts/store';
import { RootState } from '@core/types';

const mapStateToProps = (state: RootState) => ({
  loggedIn: state.app.user.loggedIn,
  lastUpdate: state.contactsStore.lastUpdate,
  activitiesLastUpdate: state.activitiesStore.lastUpdate,
  contacts: state.contactsStore.contacts,
  groups: state.contactsStore.groups
});

const mapDispatchToProps = {
  initGroups,
  getActivities,
  getContactsAndEvents,
  updateLastContact
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

export type DispatchProps = {
  initGroups: ReduxProps["initGroups"],
  getActivities: ReduxProps["getActivities"],
  getContactsAndEvents: ReduxProps["getContactsAndEvents"],
  updateLastContact: ReduxProps["updateLastContact"]
};