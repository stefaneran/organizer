import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { 
  Paper, Grid, IconButton, Tooltip,
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell 
} from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import { TalkIconExtraSmall, TalkIconExtraSmallBlue } from '@components/Icons/TalkIcon';
import { PeopleIconExtraSmall, PeopleIconExtraSmallBlue } from '@components/Icons/PeopleIcon';
import Contact from '@interfaces/contacts/Contact.interface';
import InteractionType from '@interfaces/contacts/InteractionType.interface';
import { formatDateBasic } from '@utils/dateUtils';

const useStyles = makeStyles((theme: Theme) => createStyles({
  table: {},
  tableRow: {
    cursor: 'pointer',
    transition: 'background 300ms',
    '&:hover': {
      background: theme.palette.primary.light,
    }
  },
  tableRowSelected: {
    cursor: 'pointer',
    background: theme.palette.primary.main,
    '& td': {
      color: '#fff'
    }
  }
}));

interface Filter {
  nameFilter: string;
  locationFilter: string;
  selectedSubgroup: string;
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

  const isSelected = (name) => selectedContact ? name === selectedContact.name : false;

  const filterList = (contacts) => {
    const { nameFilter, locationFilter, selectedSubgroup } = filters;
    const subgroupMatch = (subgroups) =>
      (selectedSubgroup !== 'All' && subgroups.includes(selectedSubgroup)) || selectedSubgroup === 'All';
    const nameMatch = (name) => 
      (nameFilter.length && name.toLowerCase().includes(nameFilter.toLowerCase())) || !nameFilter.length;
    const locationMatch = (location) => 
      (locationFilter.length && location.toLowerCase().includes(locationFilter.toLowerCase())) || !locationFilter.length;
    return contacts.filter(contact => 
      nameMatch(contact.name) && 
      locationMatch(contact.location) &&
      subgroupMatch(contact.subgroups)
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small">
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
            <TableRow 
              key={contact.name} 
              className={isSelected(contact.name) ? classes.tableRowSelected : classes.tableRow} 
              onClick={onSelectContact(contact)}
            >
              <TableCell>
                {contact.name}
              </TableCell>
              <TableCell>
                {formatDateBasic(contact.lastActivity)}
              </TableCell>
              <TableCell>
                {contact.location}
              </TableCell>
              <TableCell>
                {contact.priority}
              </TableCell>
              <TableCell>
                <Grid container>
                  <Grid item>
                    <Tooltip title="Log Talk">
                      <IconButton onClick={onInteraction(contact.name, InteractionType.Talk)}>
                        {isSelected(contact.name) ? (
                          <TalkIconExtraSmall />
                        ) : (
                          <TalkIconExtraSmallBlue />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title="Log Hangout" onClick={onInteraction(contact.name, InteractionType.Hangout)}>
                      <IconButton>
                        {isSelected(contact.name) ? (
                          <PeopleIconExtraSmall />
                        ) : (
                          <PeopleIconExtraSmallBlue />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title="Schedule Activity">
                      <IconButton>
                        {isSelected(contact.name) ? (
                          <EventIcon style={{ color: '#fff' }} />
                        ) : (
                          <EventIcon color="primary" />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ContactsTable;