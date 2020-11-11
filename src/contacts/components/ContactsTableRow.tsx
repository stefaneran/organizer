import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, IconButton, Tooltip, TableRow, TableCell } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import { TalkIconExtraSmall, TalkIconExtraSmallBlue } from '@core/components/Icons/TalkIcon';
import { PeopleIconExtraSmall, PeopleIconExtraSmallBlue } from '@core/components/Icons/PeopleIcon';
import InteractionType from '@contacts/interfaces/InteractionType.interface';
import Contact from '@contacts/interfaces/Contact.interface';
import { getDaysFromDate } from '@core/utils/dateUtils';
import { PriorityType } from '@core/interfaces/general';
import calculateContactUrgency from '@contacts/utils/calculateContactUrgency';

const useStyles = makeStyles((theme: Theme) => createStyles({
  tableRow: {
    cursor: 'pointer',
    transition: 'background 300ms',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.2)'
    }
  },
  tableRowSelected: {
    cursor: 'pointer',
    background: theme.palette.primary.main,
    '& td': {
      color: '#fff'
    }
  },
  reminder: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '0',
    height: '0',
    borderRight: '30px solid transparent'
  }
}));

interface Props {
  contact: Contact; 
  selectedContact: string;
  onSelectContact: (contactId: string) => (event?) => void;
  onInteraction: (contactId: string, interactionType: InteractionType) => (event?) => void;
}

const ContactsTableRow = ({ contact, selectedContact, onSelectContact, onInteraction }: Props) => {
  const classes = useStyles();
  const isSelected = (id) => selectedContact ? id === selectedContact : false;
  const urgency = calculateContactUrgency(PriorityType.Moderate, contact.lastInteraction);
  return (
    <TableRow 
      key={contact.name} 
      className={isSelected(contact.id) ? classes.tableRowSelected : classes.tableRow} 
      onClick={onSelectContact(contact.id)}
    >
      <TableCell style={{ position: 'relative' }}>
        {urgency ? (
          <div 
            className={classes.reminder} 
            style={{ 
              borderTop: `30px solid ${urgency === 2 ? 'red' : 'orange'}`,
            }}
          />
        ) : null}
        {contact.name}
      </TableCell>
      <TableCell>
        {`${getDaysFromDate(contact.lastInteraction)} days ago`}
      </TableCell>
      <TableCell>
        {contact.location}
      </TableCell>
      <TableCell>
        TODO - Friendship Index
      </TableCell>
      <TableCell>
        <Grid container>
          <Grid item>
            <Tooltip title="Log Talk">
              <IconButton onClick={onInteraction(contact.id, InteractionType.Talk)}>
                {isSelected(contact.id) ? (
                  <TalkIconExtraSmall />
                ) : (
                  <TalkIconExtraSmallBlue />
                )}
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Tooltip title="Log Hangout" onClick={onInteraction(contact.id, InteractionType.Hangout)}>
              <IconButton>
                {isSelected(contact.id) ? (
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
                {isSelected(contact.id) ? (
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
  )
}

export default ContactsTableRow;