import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import ContactsTableRow from './ContactsTableRow'; 
import Contact from '@interfaces/contacts/Contact.interface';
import InteractionType from '@interfaces/contacts/InteractionType.interface';

const useStyles = makeStyles((theme: Theme) => createStyles({
  table: {
    overflowY: 'auto'
  }
}));

interface Filter {
  nameFilter: string;
  locationFilter: string;
  selectedSubgroup: string;
  sortOrder: string;
}

interface Props {
  contacts: Contact[]; 
  filters: Filter;
  selectedContact: Contact;
  onSelectContact: (contact: Contact) => (event?) => void;
  onInteraction: (contactName: string, interactionType: InteractionType) => (event?) => void;
}

const ContactsTable = ({ contacts, filters, selectedContact, onSelectContact, onInteraction }: Props) => {
  const classes = useStyles();

  const filterList = (contacts) => {
    const { nameFilter, locationFilter, selectedSubgroup, sortOrder } = filters;
    const subgroupMatch = (subgroups) =>
      (selectedSubgroup !== 'All' && subgroups.includes(selectedSubgroup)) || selectedSubgroup === 'All';
    const nameMatch = (name) => 
      (nameFilter.length && name.toLowerCase().includes(nameFilter.toLowerCase())) || !nameFilter.length;
    const locationMatch = (location) => 
      (locationFilter.length && location.toLowerCase().includes(locationFilter.toLowerCase())) || !locationFilter.length;

    let filtered = contacts.filter(contact => 
      nameMatch(contact.name) && 
      locationMatch(contact.location) &&
      subgroupMatch(contact.subgroups)
    );
    if (sortOrder) {
      filtered = filtered.sort((a, b) => 
        sortOrder === 'descending' ? 
          a.lastActivity - b.lastActivity :
          b.lastActivity - a.lastActivity
      )
    }
    return filtered;
  };

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Last Contact</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">Priority</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filterList(contacts).map(contact => (
            <ContactsTableRow 
              key={contact.name}
              contact={contact} 
              selectedContact={selectedContact} 
              onSelectContact={onSelectContact}
              onInteraction={onInteraction}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ContactsTable;