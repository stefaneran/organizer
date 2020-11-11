import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import ContactsTableRow from './ContactsTableRow'; 
import Contact from '@contacts/interfaces/Contact.interface';
import InteractionType from '@contacts/interfaces/InteractionType.interface';

const useStyles = makeStyles((theme: Theme) => createStyles({
  table: {
    overflowY: 'auto'
  }
}));

interface Filters {
  nameFilter: string;
  locationFilter: string;
  selectedGroup: string;
  sortOrder: string;
}

interface Props {
  contacts: { [id: string]: Contact }; 
  filters: Filters;
  selectedContact: string;
  onSelectContact: (contactId: string) => (event?) => void;
  onInteraction: (contactName: string, interactionType: InteractionType) => (event?) => void;
}

const ContactsTable = ({ contacts, filters, selectedContact, onSelectContact, onInteraction }: Props) => {
  const classes = useStyles();
  const [filtered, setFiltered] = React.useState(Object.keys(contacts).map(contactId => contacts[contactId]));

  // TODO - Move to separate function
  React.useEffect(() => {
    const { nameFilter, locationFilter, selectedGroup, sortOrder } = filters;

    // Filter by groups
    const groupMatch = (groups) =>
      (selectedGroup !== 'All' && groups.includes(selectedGroup)) || selectedGroup === 'All';
    // Filter by name
    const nameMatch = (name) => 
      (nameFilter.length && name.toLowerCase().includes(nameFilter.toLowerCase())) || !nameFilter.length;
    // Filter by location
    const locationMatch = (location) => 
      (locationFilter.length && location.toLowerCase().includes(locationFilter.toLowerCase())) || !locationFilter.length;

    // Apply filters
    let newFiltered = Object.keys(contacts).filter(contactId => {
      const { name, location, groups } = contacts[contactId];
      return nameMatch(name) && locationMatch(location) && groupMatch(groups)
    }).map(contactId => contacts[contactId]);

    // Sort by activity date
    if (sortOrder) {
      newFiltered = newFiltered.sort((a, b) => 
        sortOrder === 'descending' ? 
          a.lastInteraction - b.lastInteraction :
          b.lastInteraction - a.lastInteraction
      )
    }

    // Update state hook
    setFiltered(newFiltered);
  }, [filters]);

  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Last Contact</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">Friendship</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map(contact => (
            <ContactsTableRow 
              key={contact.id}
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