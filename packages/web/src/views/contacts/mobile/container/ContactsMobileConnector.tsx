import { connect, ConnectedProps } from 'react-redux';
import { updateLastContact } from 'contacts/store/thunks';
import { initGroups } from 'contacts/store';
import { AppStore } from '@core/types';

const mapStateToProps = (state: AppStore) => ({
  contacts: state.contactsStore.contacts,
  groups: state.contactsStore.groups
});

const mapDispatchToProps = {
  initGroups,
  updateLastContact
}

export const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

export type DispatchProps = {
  initGroups: ReduxProps["initGroups"],
  updateLastContact: ReduxProps["updateLastContact"]
};