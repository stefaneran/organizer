import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { 
  Paper, Grid, IconButton, Tooltip,
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell 
} from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import { TalkIconExtraSmallBlue } from '@components/Icons/TalkIcon';
import { PeopleIconExtraSmallBlue } from '@components/Icons/PeopleIcon';
import Contact from '@interfaces/contacts/Contact.interface';
import { formatDateBasic } from '@utils/dateUtils';

const useStyles = makeStyles((theme: Theme) => createStyles({
  table: {
    // height: '100%',
    // maxWidth: 'none'
  },
  contactActions: {

  }
}));

interface Filter {
  nameFilter: string;
  locationFilter: string;
}

interface Props {
  contacts: Contact[]; 
  filters: Filter;
}



const ContactsTable = ({ contacts, filters }: Props) => {
  const classes = useStyles();

  const filterList = (contacts) => {
    const { nameFilter, locationFilter } = filters;
    const nameMatch = (name) => 
      (nameFilter.length && name.toLowerCase().includes(nameFilter.toLowerCase())) || !nameFilter.length;
    const locationMatch = (location) => 
      (locationFilter.length && location.toLowerCase().includes(locationFilter.toLowerCase())) || !locationFilter.length;
    return contacts.filter(contact => nameMatch(contact.name) && locationMatch(contact.location));
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
            <TableRow key={contact.name}>
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
                <Grid container className={classes.contactActions}>
                  <Grid item>
                    <Tooltip title="Log Talk">
                      <IconButton>
                        <TalkIconExtraSmallBlue />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title="Log Hangout">
                      <IconButton>
                        <PeopleIconExtraSmallBlue />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title="Schedule Activity">
                      <IconButton>
                        <EventIcon color="primary" />
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