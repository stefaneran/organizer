import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, IconButton, Tooltip, TableRow, TableCell } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import { TalkIconExtraSmall, TalkIconExtraSmallBlue } from '@core/components/Icons/TalkIcon';
import { PeopleIconExtraSmall, PeopleIconExtraSmallBlue } from '@core/components/Icons/PeopleIcon';
import InteractionType from '@contacts/interfaces/InteractionType.interface';
import { getDaysFromDate } from '@core/utils/dateUtils';
import { PriorityType } from '@core/interfaces/general';

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
    height: '0'
  }
}));

const priorityUrgencyCalc = (priority, lastDate) => {
  const priorityMap = {
    [PriorityType.Low]: 90,
    [PriorityType.Moderate]: 30,
    [PriorityType.High]: 7
  };
  const daysSince = getDaysFromDate(lastDate);
  if (daysSince > priorityMap[priority]) {
    if (daysSince >= priorityMap[priority] * 2) {
      return 2;
    }
    return 1;
  }
  return 0;
}

const ContactsTableRow = ({ contact, selectedContact, onSelectContact, onInteraction }) => {
  const classes = useStyles();
  const isSelected = (name) => selectedContact ? name === selectedContact.name : false;
  const urgency = priorityUrgencyCalc(contact.priority, contact.lastActivity);
  return (
    <TableRow 
      key={contact.name} 
      className={isSelected(contact.name) ? classes.tableRowSelected : classes.tableRow} 
      onClick={onSelectContact(contact)}
    >
      <TableCell style={{ position: 'relative' }}>
        {urgency ? (
          <div 
            className={classes.reminder} 
            style={{ 
              borderTop: `30px solid ${urgency === 2 ? 'red' : 'orange'}`, 
              borderRight: '30px solid transparent' 
            }}
          />
        ) : null}
        {contact.name}
      </TableCell>
      <TableCell>
        {`${getDaysFromDate(contact.lastActivity)} days ago`}
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
  )
}

export default ContactsTableRow;