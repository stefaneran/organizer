import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { 
  Paper, Button,
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell 
} from '@material-ui/core';
import Person from '@interfaces/contacts/Person.interface';
import { formatDateBasic } from '@utils/dateUtils';

const useStyles = makeStyles((theme: Theme) => createStyles({
  table: {
    // height: '100%',
    // maxWidth: 'none'
  },
  personActions: {

  }
}));

const ContactsTable = ({ contacts }: { contacts: Person[] }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Last Contact</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map(person => (
            <TableRow key={person.name}>
              <TableCell>
                {person.name}
              </TableCell>
              <TableCell>
                {formatDateBasic(person.lastActivity)}
              </TableCell>
              <TableCell>
                {person.location}
              </TableCell>
              <TableCell>
                {person.priority}
              </TableCell>
              <TableCell>
                <div className={classes.personActions}>
                  <Button variant="outlined" color="primary" endIcon>
                    Talk
                  </Button>
                  <Button variant="outlined" color="primary" endIcon>
                    Hangout
                  </Button>
                  <Button variant="outlined" color="primary" endIcon>
                    Schedule
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ContactsTable;