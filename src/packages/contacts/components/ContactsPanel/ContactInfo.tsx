import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography, IconButton, Button, Tooltip } from '@material-ui/core';
// Icons
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { PeopleIconMediumInfo } from '@core/components/Icons/PeopleIcon';
// Components
import ContactInfoEdit from 'contacts/components/ContactsPanel/ContactInfoEdit';
import GenderChip from 'contacts/components/ContactsPanel/GenderChip';
import RelationshipChip from 'contacts/components/ContactsPanel/RelationshipChip';
import OneOnOneChip from 'contacts/components/ContactsPanel/OneOnOneChip';
import Chips from 'contacts/components/Chips';
// Utils
import { formatDateClassic } from '@core/utils/dateUtils';
// Types
import { Contact } from 'contacts/types';
import { ReduxProps } from 'contacts/container/ContactsConnector';

const useStyles = makeStyles(() => createStyles({
  sidepanel: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    transition: 'right 300ms',
    background: '#ecedf0',
    padding: '1em'
  },
  headline: {
    position: 'absolute',
    top: '0.5em',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  topButtons: {
    textAlign: 'right'
  },
  infoContainer: {
    textAlign: 'left'
  },
  infoGroup: {
    display: 'flex',
    marginTop: '1em'
  },
  locationIcon: {
    height: '1em',
    width: '1em',
    position: 'relative',
    top: '0.15em',
    marginRight: '0.4em'
  },
  snoozeButton: {
    marginTop: '2em',
    textAlign: 'center'
  }
}));

interface Props {
  contact: Contact;
  contactId: string;
  groups: string[];
  isOpen: boolean;
  onClose: () => void;
  onSnoozeContact: () => void;
  onDeleteContact: () => void;
  createContact: ReduxProps["createContact"];
  editContact: ReduxProps["editContact"];
}

const ContactInfo: React.FC<Props> = ({ 
  contact,
  contactId,
  groups,
  isOpen,
  onClose,
  onSnoozeContact,
  onDeleteContact,
  createContact,
  editContact
 }) => {
  const classes = useStyles();
  const isCreate = !Boolean(contactId);

  const [isEdit, setIsEdit] = React.useState(isCreate);

  React.useEffect(() => {
    if (isCreate) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  }, [contactId])

  const toggleEdit = () => setIsEdit(!isEdit);
  const handleClose = () => onClose();

  return (
    <div className={classes.sidepanel} style={{ right: isOpen ? '0%' : '-100%' }}>
      {isOpen ? (
        <>
          <div className={classes.topButtons}>
            {!isCreate ? (
              <IconButton onClick={toggleEdit}>
                <EditIcon />
              </IconButton>
            ) : null}
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>

          {isEdit ? (
            <ContactInfoEdit 
              contact={contact}
              contactId={contactId}
              groups={groups}
              onClose={handleClose}
              toggleEdit={toggleEdit}
              createContact={createContact}
              editContact={editContact}
              onDeleteContact={onDeleteContact}
            />
          ) : (
            <>
              <Typography variant="h4" className={classes.headline}>
                {contact.name}
              </Typography>
              <div className={classes.infoContainer}>

                <div className={classes.infoGroup} style={{ justifyContent: 'center' }}>
                  <GenderChip gender={contact.gender} />
                  <RelationshipChip relationshipStatus={contact.relationshipStatus} />
                  <OneOnOneChip oneOnOne={contact.oneOnOne} />
                </div>

                <div className={classes.infoGroup}>
                  <LocationOnIcon className={classes.locationIcon} />
                  <Typography variant="h5">
                    {contact.location}
                  </Typography>
                </div>

                <div className={classes.infoGroup}>
                  <Typography variant="h5">
                    Last Contact: {formatDateClassic(contact.lastContact)}
                  </Typography>
                </div>

                {contact.groups?.length ? (
                  <div className={classes.infoGroup}>
                    <PeopleIconMediumInfo />
                    <Chips 
                      memo={() => contact.groups ?? []}
                      deps={[contact.groups]}
                      getKey={(group) => group}
                      getLabel={(group) => group}
                    />
                  </div>
                ) : null}

                <div className={classes.snoozeButton}>
                  <Tooltip title="Refreshes the last time you had contact with this person">
                    <Button 
                      variant="outlined"
                      color="primary"
                      onClick={onSnoozeContact}
                    >
                      Update Last Contact
                    </Button>
                  </Tooltip>
                </div>

              </div>
            </>
          )}
        </>
      ) : null}
    </div>
  )
}

export default ContactInfo;