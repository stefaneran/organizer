import { connect } from 'react-redux';
import { updateGroups } from '@contacts/store';
import {
  createContact,
  deleteContact,
  editContact,
  addContactInteraction
} from '@contacts/store/thunks';
import ContactsContainer from './ContactsContainer';

const mapStateToProps = state => ({
  contacts: state.contactsStore.contacts,
  groups: state.contactsStore.groups
});

const mapDispatchToProps = {
  updateGroups,
  createContact,
  deleteContact,
  editContact,
  addContactInteraction
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsContainer);